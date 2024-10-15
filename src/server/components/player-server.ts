import { Component } from "@flamework/components";
import { OnStart } from "@flamework/core";
import { AbstractPlayer } from "shared/components/abstract-player";
import { CharacterServer } from "./character-server";

@Component({
	tag: AbstractPlayer.TAG,
})
export class PlayerServer extends AbstractPlayer implements OnStart {
	onStart(): void {
		if (this.instance.Character) {
			this.onCharacterAdded(this.instance.Character);
		}
		this.instance.CharacterAdded.Connect((character) => this.onCharacterAdded(character));
	}

	private onCharacterAdded(character: Model) {
		character.AddTag(CharacterServer.TAG);
	}
}
