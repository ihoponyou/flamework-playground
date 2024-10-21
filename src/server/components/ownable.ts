import { BaseComponent, Component } from "@flamework/components";
import { CharacterServer } from "./character-server";

@Component({
	tag: Ownable.TAG,
})
export class Ownable extends BaseComponent {
	static readonly TAG = "Ownable";

	private owner?: CharacterServer;

	setOwner(owner?: CharacterServer) {
		this.owner = owner;
	}

	getOwner(): CharacterServer | undefined {
		return this.owner;
	}

	isOwnedBy(character?: CharacterServer): boolean {
		return this.owner === character;
	}
}
