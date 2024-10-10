import { Component } from "@flamework/components";
import { OnStart } from "@flamework/core";
import { AbstractCharacter } from "shared/components/abstract-character";
import { EquippableServer } from "./equippable-server";

@Component({
	tag: AbstractCharacter.TAG,
})
export class CharacterServer extends AbstractCharacter implements OnStart {
	protected inventory = this.newInventory();

	private equippedThing?: EquippableServer;

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

	getItem(itemName: string): Instance | undefined {
		return this.inventory.FindFirstChild(itemName);
	}

	private newInventory(): Folder {
		const inventory = new Instance("Folder");
		inventory.Name = "Inventory";
		return inventory;
	}
}
