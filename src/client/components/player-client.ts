import { Component } from "@flamework/components";
import { OnStart } from "@flamework/core";
import { LOCAL_PLAYER } from "client/constants";
import { AbstractPlayer } from "shared/components/abstract-player";

@Component({
	tag: "Player",
	predicate: (instance) => instance === LOCAL_PLAYER,
})
export class PlayerClient extends AbstractPlayer implements OnStart {
	protected inventory!: Folder;

	onStart(): void {
		this.inventory = this.instance.WaitForChild("Inventory") as Folder;
		print("inventory located", this.inventory);
	}
}
