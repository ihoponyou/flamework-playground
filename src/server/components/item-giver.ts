import { BaseComponent, Component } from "@flamework/components";
import { OnStart } from "@flamework/core";
import { store } from "server/store";
import { Item } from "shared/configs/items";

@Component({
	tag: "ItemGiver",
})
export class ItemGiver extends BaseComponent<{}, BasePart> implements OnStart {
	private clickDetector = new Instance("ClickDetector");

	onStart(): void {
		this.clickDetector.Parent = this.instance;
		this.clickDetector.MouseClick.Connect((player) => this.onClick(player));
	}

	private onClick(playerWhoClicked: Player): void {
		store.addItem(playerWhoClicked, Item.GOBLET, 2);
	}
}