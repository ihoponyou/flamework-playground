import { OnStart, Service } from "@flamework/core";
import { Players } from "@rbxts/services";
import { producer } from "server/store";

@Service()
export class TestService implements OnStart {
	onStart(): void {
		coroutine.wrap(() => {
			while (task.wait(10) !== undefined) {
				for (const player of Players.GetPlayers()) {
					producer.addCurrency(player, "Silver", math.random(100));
				}
			}
		})();

		producer.subscribe((state) => print(state));
	}
}
