import { Component, Components } from "@flamework/components";
import { AbstractItem } from "shared/components/abstract-item";
import { EquippableServer } from "./equippable-server";

@Component({
	tag: AbstractItem.TAG,
})
export class ItemServer extends AbstractItem {
	constructor(components: Components, protected equippable: EquippableServer) {
		super(components);
	}

	override onStart(): void {
		super.onStart();
	}
}
