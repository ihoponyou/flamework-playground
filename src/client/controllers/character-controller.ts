import { Components } from "@flamework/components";
import { Controller, OnStart } from "@flamework/core";
import { CharacterClient } from "client/components/character-client";
import { LOCAL_PLAYER } from "client/configs/constants";

@Controller()
export class CharacterController implements OnStart {
	private character?: CharacterClient;

	constructor(private components: Components) {}

	onStart(): void {
		const character = LOCAL_PLAYER.Character;
		if (character !== undefined) {
			this.components.waitForComponent<CharacterClient>(character).andThen((characterClient) => {
				this.character = characterClient;
			});
		}
		LOCAL_PLAYER.CharacterAdded.Connect((newCharacter) => {
			this.components.waitForComponent<CharacterClient>(newCharacter).andThen((characterClient) => {
				this.character = characterClient;
			});
		});
	}

	getCharacter(): CharacterClient | undefined {
		return this.character;
	}
}
