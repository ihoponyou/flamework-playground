import { Component } from "@flamework/components";
import { AbstractCharacter } from "shared/components/abstract-character";

@Component({
	tag: AbstractCharacter.TAG,
})
export class CharacterServer extends AbstractCharacter {
	lightAttack(): void {
		// get currently equipped weapon
		print("punch");
	}

	heavyAttack(): void {
		print("big punch");
	}

	block(blockUp: boolean): void {
		print("block =", blockUp);
	}
}
