import { Components } from "@flamework/components";
import { Controller, OnStart } from "@flamework/core";
import { CharacterController } from "./character-controller";

@Controller()
export class InventoryController implements OnStart {
	private inventory!: Folder;

	constructor(private components: Components, private characterController: CharacterController) {}

	onStart(): void {
		// TOOD: fix (this will break on respawn)
		let characterClient = this.characterController.getCharacter();
		while (characterClient === undefined) {
			task.wait();
			characterClient = this.characterController.getCharacter();
		}

		// task.spawn(() => {
		// 	while (task.wait(5) !== undefined) {
		// 		print(store.getState());
		// 	}
		// });
	}
}
