import { OnStart, Service } from "@flamework/core";
import { Players } from "@rbxts/services";

@Service()
export class PlayerService implements OnStart {
	public onStart(): void {
		Players.PlayerAdded.Connect((player) => player.AddTag("Player"));
	}
}
