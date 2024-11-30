import { Service } from "@flamework/core";
import { PlayerServer } from "server/components/player-server";
import { OnPlayerAdded } from "shared/lifecycles";

@Service()
export class SetupService implements OnPlayerAdded {
	onPlayerAdded(player: Player): void {
		player.AddTag(PlayerServer.TAG);
	}
}
