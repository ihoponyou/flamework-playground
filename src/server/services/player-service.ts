import { OnStart, Service } from "@flamework/core";
import { Players } from "@rbxts/services";
import { PlayerServer } from "server/components/player-server";

@Service()
export class PlayerService implements OnStart {
	onStart(): void {
		Players.PlayerAdded.Connect((player) => this.onPlayerAdded(player));
	}

	private onPlayerAdded(player: Player): void {
		player.AddTag(PlayerServer.TAG);
	}
}
