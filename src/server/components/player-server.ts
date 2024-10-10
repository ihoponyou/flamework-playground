import { Component, Components } from "@flamework/components";
import { OnStart } from "@flamework/core";
import { store } from "server/store";
import { selectPlayerItems } from "server/store/selectors";
import { AbstractPlayer } from "shared/components/abstract-player";
import { Item } from "shared/configs/items";
import { CharacterServer } from "./character-server";

@Component({
	tag: AbstractPlayer.TAG,
})
export class PlayerServer extends AbstractPlayer implements OnStart {
	private character?: CharacterServer;

	constructor(private components: Components) {
		super();
	}

	onStart(): void {
		store.subscribe(selectPlayerItems(this.instance), (state) => print(state));
		const character = this.instance.Character;
		if (character !== undefined) {
			this.updateCharacter(character);
		}
		this.instance.CharacterAdded.Connect((character) => this.updateCharacter(character));
	}

	private updateCharacter(newCharacterInstance: Model): void {
		newCharacterInstance.AddTag(CharacterServer.TAG);
		this.character = this.components.waitForComponent<CharacterServer>(newCharacterInstance).expect();
	}

	private updateInventory(newItems: ReadonlyMap<Item, number>) {
		// TODO: iterate over new inventory; give the character items to use
	}
}
