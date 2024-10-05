import { Controller, OnStart } from "@flamework/core";
import { producer } from "client/store";

@Controller()
export class InventoryController implements OnStart {
	private toolInstances = new Map<string, Tool>();
	onStart(): void {
		producer.observe(
			(state) => state.inventory.items,
			(item, index) => {
				print(item, index);
			},
		);
	}
}
