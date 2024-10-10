import { BaseComponent, Component } from "@flamework/components";
import { AbstractCharacter } from "./abstract-character";

@Component()
export abstract class AbstractEquippable extends BaseComponent {
	static readonly TAG: string = "Equippable";

	protected _isEquipped = false;

	abstract equipTo(character: AbstractCharacter): void;
	abstract unequipFrom(character: AbstractCharacter): void;

	canBeEquippedBy(character: AbstractCharacter): boolean {
		return true;
	}

	isEquipped(): boolean {
		return this._isEquipped;
	}
}
