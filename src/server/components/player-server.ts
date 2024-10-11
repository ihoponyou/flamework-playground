import { Component, Components } from "@flamework/components";
import { OnStart } from "@flamework/core";
import { store } from "server/store";
import { selectPlayerItems } from "server/store/selectors";
import { AbstractPlayer } from "shared/components/abstract-player";
import { ItemId } from "shared/configs/items";
import { CharacterServer } from "./character-server";
import { Item } from "./item-server";

function playerHasInventory(inventory: ReadonlyMap<ItemId, number> | undefined) {
	return inventory !== undefined;
}

@Component({
	tag: AbstractPlayer.TAG,
})
export class PlayerServer extends AbstractPlayer implements OnStart {
	private readonly UNDEFINED_CHARACTER_MESSAGE = `undefined character component PlayerServer@${this.instance}`;
	private character?: CharacterServer;
	private unsubscribeFromInventory?: () => void;

	constructor(private components: Components) {
		super();
	}

	onStart(): void {
		const character = this.instance.Character;
		if (character !== undefined) {
			this.updateCharacter(character);
		}
		this.instance.CharacterAdded.Connect((character) => this.updateCharacter(character));

		// use an observer? cannot since player state may be undefined
		this.unsubscribeFromInventory = store.subscribe(selectPlayerItems(this.instance), (state) => {
			if (state === undefined) return;
			this.updateInventory(state);
		});
	}

	override destroy(): void {
		if (this.unsubscribeFromInventory) this.unsubscribeFromInventory();
	}

	private updateCharacter(newCharacterInstance: Model): void {
		newCharacterInstance.AddTag(CharacterServer.TAG);
		this.character = this.components.waitForComponent<CharacterServer>(newCharacterInstance).expect();
		const inventory = store.getState(selectPlayerItems(this.instance));
		if (inventory) this.updateInventory(inventory);
	}

	private updateInventory(newItems: ReadonlyMap<ItemId, number>) {
		if (this.character === undefined) {
			warn(this.UNDEFINED_CHARACTER_MESSAGE);
			return;
		}
		for (const [itemName, quantity] of newItems) {
			const existingItem = this.character.getItem(itemName);
			if (existingItem) {
				if (existingItem.attributes.quantity === quantity) {
					continue;
				} else {
					existingItem.attributes.quantity = quantity;
					break;
				}
			}

			Item.createItem(quantity, itemName).andThen((item) => {
				if (this.character === undefined) {
					warn(this.UNDEFINED_CHARACTER_MESSAGE);
					return;
				}
				this.character.addToInventory(item);
			});
		}
	}
}
