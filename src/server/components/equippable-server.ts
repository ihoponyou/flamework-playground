import { Component } from "@flamework/components";
import { AbstractEquippable } from "shared/components/abstract-equippable";
import { Ownable } from "./ownable";

@Component({
	tag: AbstractEquippable.TAG,
})
export class EquippableServer extends AbstractEquippable {
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
}
