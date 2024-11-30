import { Components } from "@flamework/components";
import { OnStart, Service } from "@flamework/core";
import { CharacterServer } from "server/components/character-server";
import { PlayerServer } from "server/components/player-server";
import { Events } from "server/network";

@Service()
export class CombatService implements OnStart {
	constructor(private components: Components) {}

	onStart(): void {
		Events.lightAttack.connect((player) => {
			this.getPlayerCharacter(player).lightAttack();
		});
		Events.heavyAttack.connect((player) => {
			this.getPlayerCharacter(player).heavyAttack();
		});
		Events.block.connect((player, blockUp) => {
			this.getPlayerCharacter(player).block(blockUp);
		});
	}

	private getPlayerCharacter(player: Player): CharacterServer {
		const playerServer = this.components.getComponent<PlayerServer>(player);
		if (playerServer === undefined) {
			error(`no player component`);
		}
		const character = playerServer.getCharacter();
		if (character === undefined) {
			error(`no character`);
		}
		return character;
	}
}
