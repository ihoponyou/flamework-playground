import { Controller, OnStart } from "@flamework/core";
import { producer } from "client/store";

@Controller()
export class TestController implements OnStart {
	onStart(): void {
		producer.subscribe((state) => {
			print(state.currencies.Silver.amount);
			print(state.inventory.items);
		});
	}
}
