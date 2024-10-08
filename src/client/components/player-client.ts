import { Component } from "@flamework/components";
import { OnStart } from "@flamework/core";
import { LOCAL_PLAYER } from "client/constants";
import { store } from "client/store";
import { AbstractPlayer } from "shared/components/abstract-player";
import { selectItems } from "shared/store/slices/inventory/selectors";

@Component({
	tag: "Player",
	predicate: (instance) => instance === LOCAL_PLAYER,
})
export class PlayerClient extends AbstractPlayer implements OnStart {
	protected inventory!: Folder;

	onStart(): void {
		this.inventory = this.instance.WaitForChild("Inventory") as Folder;
		print("inventory located", this.inventory);
		store.subscribe(selectItems(), (state) => {
			print(state);
		});
	}
}
