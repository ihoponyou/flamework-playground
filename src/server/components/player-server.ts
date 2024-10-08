import { Component } from "@flamework/components";
import { OnStart } from "@flamework/core";
import { AbstractPlayer } from "shared/components/abstract-player";

@Component({
	tag: "Player",
})
export class PlayerServer extends AbstractPlayer implements OnStart {
	protected inventory: Folder = this.newInventory();

	onStart(): void {
		this.inventory.Parent = this.instance;
	}

	private newInventory(): Folder {
		const inventory = new Instance("Folder");
		inventory.Name = "Inventory";
		return inventory;
	}
}
