import { Controller, OnStart } from "@flamework/core";
import { producer } from "client/producer";

@Controller()
export class TestController implements OnStart {
	onStart(): void {
		producer.subscribe((state) => print(state));
	}
}
