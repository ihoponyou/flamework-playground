import { Controller, OnStart } from "@flamework/core";

@Controller()
export class TestController implements OnStart {
	onStart(): void {
		// producer.subscribe((state) => print(state.currencies.Silver.amount));
	}
}
