import { Component } from "@flamework/components";
import Signal from "@rbxts/signal";
import { AbstractEquippable } from "shared/components/abstract-equippable";
import { Ownable } from "./ownable";

type EquipChangedCallback = (isEquipped: boolean) => void;

@Component({
	tag: AbstractEquippable.TAG,
})
export class EquippableServer extends AbstractEquippable {
	private equipChanged = new Signal<EquipChangedCallback>();

	constructor(private ownable: Ownable) {
		super();
	}

	equip(player: Player): void {
		if (!this.ownable.isOwnedBy(player)) {
			warn(`${player} tried to equip ${this.instance.GetFullName()} but does not own`);
			return;
		}
		// ... do stuff
	}

	unequip(player: Player): void {
		if (!this.ownable.isOwnedBy(player)) {
			warn(`${player} tried to unequip ${this.instance.GetFullName()} but does not own`);
			return;
		}
		// ... do stuff
	}

	onEquipChanged(callback: EquipChangedCallback): RBXScriptConnection {
		return this.equipChanged.Connect((isEquipped) => callback(isEquipped));
	}
}
