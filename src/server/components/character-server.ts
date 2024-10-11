import { Component, Components } from "@flamework/components";
import { OnStart } from "@flamework/core";
import { AbstractCharacter } from "shared/components/abstract-character";
import { EquippableServer } from "./equippable-server";
import { Item } from "./item-server";

@Component({
	tag: AbstractCharacter.TAG,
})
export class CharacterServer extends AbstractCharacter implements OnStart {
	protected inventory = this.newInventory();

	private equippedThing?: EquippableServer;

	constructor(private components: Components) {
		super();
	}

	onStart(): void {
		this.inventory.Parent = this.instance;
	}

	equip(equippable: EquippableServer): boolean {
		if (this.equippedThing !== undefined) {
			if (!this.unequip(this.equippedThing)) {
				return false;
			}
		}
		equippable.equipTo(this);
		this.equippedThing = equippable;
		return true;
	}

	unequip(equippable: EquippableServer): boolean {
		equippable.unequipFrom(this);
		this.equippedThing = undefined;
		return true;
	}

	hasItem(itemName: string): boolean {
		return this.getItem(itemName) !== undefined;
	}

	getItem(itemName: string): Item | undefined {
		const instance = this.inventory.FindFirstChild(itemName);
		if (instance === undefined) return undefined;
		const item = this.components.getComponent<Item>(instance);
		return item;
	}

	addToInventory(item: Item): void {
		item.instance.Parent = this.inventory;
	}

	private newInventory(): Folder {
		const inventory = new Instance("Folder");
		inventory.Name = "Inventory";
		return inventory;
	}
}
