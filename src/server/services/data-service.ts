import { OnStart, Service } from "@flamework/core";
import { GetProfileStore } from "@rbxts/profileservice";
import { Profile } from "@rbxts/profileservice/globals";
import { Players, RunService } from "@rbxts/services";
import { producer } from "server/store";
import { selectPlayer } from "server/store/selectors";
import { DEFAULT_PLAYER_DATA, SharedState } from "shared/store";

const PROFILE_STORE_INDEX = RunService.IsStudio() ? "Testing" : "Production";
const PROFILE_KEY_TEMPLATE = "Player%d";
const WIPE_DATA_ON_JOIN = false;

type PlayerProfile = Profile<SharedState>;

@Service()
export class DataService implements OnStart {
	private profiles = new Map<number, PlayerProfile>();
	private profileStore = GetProfileStore(PROFILE_STORE_INDEX, DEFAULT_PLAYER_DATA);
	private joinTicks = new Map<Player, number>();
	private preReleaseListeners = new Map<Player, Array<(profile: PlayerProfile) => void>>();

	onStart(): void {
		Players.PlayerAdded.Connect((player) => this.onPlayerAdded(player));
		Players.PlayerRemoving.Connect((player) => this.onPlayerRemoving(player));
	}

	public onPlayerAdded(player: Player): void {
		this.setupProfile(player);
	}

	public onPlayerRemoving(player: Player): void {
		const profile = this.profiles.get(player.UserId);
		if (!profile) return;

		const listeners = this.preReleaseListeners.get(player);
		listeners?.forEach((listener) => listener(profile));
		this.preReleaseListeners.delete(player);

		profile.Release();
	}

	public connectToPreRelease(player: Player, listener: (profile: PlayerProfile) => void): () => void {
		const listeners = this.preReleaseListeners.get(player);
		if (listeners === undefined) error(`no listener arr found for ${player}`);
		listeners.push(listener);
		return () => listeners.remove(listeners.findIndex((value) => value === listener));
	}

	public getProfile(player: Player): PlayerProfile {
		const profile = this.profiles.get(player.UserId);
		if (!profile) error(`could not fetch profile for ${player.Name}`);
		return profile;
	}

	private setupProfile(player: Player): void {
		const key = PROFILE_KEY_TEMPLATE.format(player.UserId);

		if (WIPE_DATA_ON_JOIN) this.profileStore.WipeProfileAsync(key);

		const profile = this.profileStore.LoadProfileAsync(key);
		if (!profile) {
			player.Kick("data loading issue");
			return;
		}

		profile.AddUserId(player.UserId);
		profile.Reconcile();

		const onRelease = profile.ListenToRelease(() => {
			this.profiles.delete(player.UserId);
			this.preReleaseListeners.delete(player);
			player.Kick("get released");
			onRelease.Disconnect();
		});

		this.profiles.set(player.UserId, profile);
		this.joinTicks.set(player, math.round(tick()));
		this.preReleaseListeners.set(player, []);

		print("loading data...");
		producer.loadPlayerData(player, profile.Data);
		this.giveLeaderStatsFolder(player);

		const unsubscribe = producer.subscribe(selectPlayer(player), (data) => {
			if (data !== undefined) {
				profile.Data = data;
			}
		});

		Players.PlayerRemoving.Connect((removingPlayer) => {
			if (removingPlayer === player) return;
			unsubscribe();
		});
	}

	private giveLeaderStatsFolder(player: Player) {
		const leaderStats = new Instance("Folder");
		leaderStats.Parent = player;
		leaderStats.Name = "leaderstats";

		const silver = new Instance("NumberValue");
		silver.Parent = leaderStats;
		silver.Name = "Silver";

		// FIXME: subscribing doesn't provide an initial value ???
		silver.Value = producer.getState().get(tostring(player.UserId))?.currencies.Silver.amount ?? 123;
		producer.subscribe(selectPlayer(player), (newState) => {
			silver.Value = newState?.currencies.Silver.amount ?? 0;
		});
	}
}
