import { BaseComponent, Component } from "@flamework/components";
import { CharacterServer } from "./character-server";

@Component({
	tag: Ownable.TAG,
})
export class Ownable extends BaseComponent {
	static readonly TAG = "Ownable";

	private owner?: CharacterServer;

	public getOwner(): CharacterServer | undefined {
		return this.owner;
	}

	public setOwner(character: CharacterServer): void {
		this.owner = character;
	}

	public hasOwner(): boolean {
		return this.owner !== undefined;
	}

	public isOwnedBy(character: CharacterServer): boolean {
		return this.owner === character;
	}
}
