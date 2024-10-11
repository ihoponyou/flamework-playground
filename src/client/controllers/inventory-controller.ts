import { Controller, OnStart } from "@flamework/core";
import { CharacterController } from "./character-controller";

@Controller()
export class InventoryController implements OnStart {
	private inventory!: Folder;

	constructor(private characterController: CharacterController) {}

	onStart(): void {
		// this is garbage
		let characterClient = this.characterController.getCharacter();
		while (characterClient === undefined) {
			task.wait();
			characterClient = this.characterController.getCharacter();
		}

		this.inventory = characterClient.instance.WaitForChild("Inventory") as Folder;
	}
}
