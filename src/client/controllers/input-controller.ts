import { Controller, OnStart } from "@flamework/core";
import { UserInputService } from "@rbxts/services";
import { Events } from "client/network";

@Controller()
export class InputController implements OnStart {
	onStart(): void {
		UserInputService.InputBegan.Connect((...args) => this.onInputBegan(...args));
		UserInputService.InputEnded.Connect((...args) => this.onInputEnded(...args));
	}

	private onInputBegan(input: InputObject, gameProcessedEvent: boolean): void {
		if (gameProcessedEvent) {
			return;
		}
		switch (input.KeyCode) {
			case Enum.KeyCode.F:
				Events.block(true);
				return;
		}
		switch (input.UserInputType) {
			case Enum.UserInputType.MouseButton1:
				Events.lightAttack();
				return;
			case Enum.UserInputType.MouseButton2:
				Events.heavyAttack();
				return;
		}
	}

	private onInputEnded(input: InputObject, gameProcessedEvent: boolean): void {
		if (gameProcessedEvent) {
			return;
		}
		switch (input.KeyCode) {
			case Enum.KeyCode.F:
				Events.block(false);
				return;
		}
	}
}
