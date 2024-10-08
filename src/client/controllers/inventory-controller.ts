import { Controller, OnStart } from "@flamework/core";
import { LOCAL_PLAYER } from "client/constants";
import { store } from "client/store";
import { selectItems } from "shared/store/slices/inventory/selectors";

@Controller()
export class InventoryController implements OnStart {
	private inventory!: Folder;

	onStart(): void {
		this.inventory = LOCAL_PLAYER.WaitForChild("Inventory") as Folder;
		print(this.inventory.GetFullName());
		store.subscribe(selectItems(), (state) => {
			print(state);
		});
	}
}
