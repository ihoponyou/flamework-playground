import { Component } from "@flamework/components";
import { AbstractUseable } from "shared/components/abstract-useable";
import { CharacterServer } from "./character-server";
import { EquippableServer } from "./equippable-server";
import { Ownable } from "./ownable";

@Component({
	tag: AbstractUseable.TAG,
})
export class UseableServer extends AbstractUseable {
	constructor(private equippable: EquippableServer, private ownable: Ownable) {
		super();
	}

	use(character: CharacterServer): void {
		if (!this.ownable.isOwnedBy(character)) {
			warn(`${character} tried to use ${this.instance.GetFullName()} which they do not own`);
			return;
		}
		if (!this.equippable.isEquipped()) {
			warn(`${character} tried to use ${this.instance.GetFullName()} while unequipped`);
			return;
		}
		print(`used ${this.instance}`);
	}
}
