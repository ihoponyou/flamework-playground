import { OnStart, Service } from "@flamework/core";
import { Players } from "@rbxts/services";

@Service()
export class PlayerService implements OnStart {
	private playerAddedConn!: RBXScriptConnection;

	onStart(): void {
		this.playerAddedConn = Players.PlayerAdded.Connect((player) => this.onPlayerAdded(player));
	}

	private onPlayerAdded(player: Player): void {
		player.AddTag("Player");
	}
}
