import { BaseComponent, Component, Components } from "@flamework/components";
import { OnStart } from "@flamework/core";
import { CharacterServer } from "./character-server";

@Component({
	tag: "Player",
})
export class PlayerServer extends BaseComponent<{}, Player> implements OnStart {
	static readonly TAG = "Player";

	private character?: CharacterServer;

	constructor(private components: Components) {
		super();
	}

	onStart(): void {
		// clean up this conn
		this.instance.CharacterAdded.Connect((model) => {
			model.AddTag(CharacterServer.TAG);
			this.components.waitForComponent<CharacterServer>(model).andThen((component) => {
				this.character = component;
			});
		});

		this.instance.CharacterRemoving.Connect(() => {
			this.character = undefined;
		});
	}

	getCharacter(): CharacterServer | undefined {
		return this.character;
	}
}
