import { Component, Components } from "@flamework/components";
import { Events } from "client/network";
import { AbstractItem } from "shared/components/abstract-item";
import { UsefulModel } from "shared/components/useful-model";

@Component({
	tag: AbstractItem.TAG,
})
export class ItemClient extends AbstractItem {
	protected override worldModel!: UsefulModel;

	constructor(private components: Components) {
		super();
	}

	override onStart(): void {
		super.onStart();

		const worldModelInstance = this.instance.WaitForChild("WorldModel");
		this.worldModel = this.components.waitForComponent<UsefulModel>(worldModelInstance).expect();
	}

	override equip(): void {
		Events.equip.fire(this.instance, true);
	}

	override unequip(): void {
		Events.equip.fire(this.instance, false);
	}
}
