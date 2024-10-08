import { Component } from "@flamework/components";
import { Events } from "client/network";
import { AbstractEquippable } from "shared/components/abstract-equippable";

@Component({
	tag: AbstractEquippable.TAG,
})
export class EquippableClient extends AbstractEquippable {
	equip(): void {
		Events.equip(this.instance, true);
	}
	unequip(): void {
		Events.equip(this.instance, false);
	}
}
