import { Components } from "@flamework/components";
import { OnStart, Service } from "@flamework/core";
import { GetProfileStore } from "@rbxts/profileservice";
import { Profile } from "@rbxts/profileservice/globals";
import { Players, RunService } from "@rbxts/services";
import { PlayerServer } from "server/components/player-server";
import { store } from "server/store";
import { selectPlayer } from "server/store/selectors";
import { DEFAULT_PLAYER_PROFILE_DATA, PlayerProfileData } from "shared/store/player-data";

const PROFILE_STORE_INDEX = RunService.IsStudio() ? "Testing" : "Production";
const PROFILE_KEY_TEMPLATE = "Player%d";
const WIPE_DATA_ON_JOIN = false;
if (WIPE_DATA_ON_JOIN) warn("PROFILES ARE WIPED ON JOIN");

type PlayerProfile = Profile<PlayerProfileData>;

@Service()
export class DataService implements OnStart {
	private profileStore = GetProfileStore(PROFILE_STORE_INDEX, DEFAULT_PLAYER_PROFILE_DATA);
	private profiles = new Map<Player, PlayerProfile>();
	private preReleaseListeners = new Map<Player, Array<(profile: PlayerProfile) => void>>();

	constructor(private components: Components) {}

	onStart(): void {
		for (const player of Players.GetPlayers()) {
			this.onPlayerAdded(player);
		}
		Players.PlayerAdded.Connect((player) => this.onPlayerAdded(player));
		Players.PlayerRemoving.Connect((player) => this.onPlayerRemoving(player));
	}

	private onPlayerAdded(player: Player): void {
		this.setupProfile(player);
		this.components.waitForComponent<PlayerServer>(player).andThen((playerServer) => {
			playerServer.instance.LoadCharacter();
			// playerServer.loadCharacter();
		});
	}

	private onPlayerRemoving(player: Player): void {
		const profile = this.profiles.get(player);
		if (profile === undefined) return;
		const listeners = this.preReleaseListeners.get(player);
		listeners?.forEach((listener) => listener(profile));
		profile.Release();
	}

	/**
	 * @return A function that disconnects the given listener
	 */
	public connectToPreRelease(player: Player, listener: (profile: PlayerProfile) => void): () => void {
		const listeners = this.preReleaseListeners.get(player);
		if (listeners === undefined) error(`no listener arr found for ${player}`);
		listeners.push(listener);
		return () => listeners.remove(listeners.findIndex((value) => value === listener));
	}

	public getProfile(player: Player): PlayerProfile {
		const profile = this.profiles.get(player);
		if (profile === undefined) error(`could not fetch profile for ${player.Name}`);
		return profile;
	}

	private setupProfile(player: Player): void {
		const key = PROFILE_KEY_TEMPLATE.format(player.UserId);

		if (WIPE_DATA_ON_JOIN) this.profileStore.WipeProfileAsync(key);

		const profile = this.profileStore.LoadProfileAsync(key);
		if (profile === undefined) {
			player.Kick("data loading issue");
			return;
		}

		profile.AddUserId(player.UserId);
		profile.Reconcile();

		const onRelease = profile.ListenToRelease(() => {
			this.profiles.delete(player);
			this.preReleaseListeners.delete(player);
			player.Kick("get released");
			onRelease.Disconnect();
		});

		this.profiles.set(player, profile);
		this.preReleaseListeners.set(player, []);
		store.loadPlayerData(player, profile.Data);

		const unsubscribe = store.subscribe(selectPlayer(player), (state) => {
			if (state) profile.Data = state;
		});

		const stopSubscription = Players.PlayerRemoving.Connect((leavingPlayer) => {
			if (leavingPlayer !== player) return;
			unsubscribe();
			stopSubscription.Disconnect();
		});
	}
}
