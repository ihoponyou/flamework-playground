import { BaseComponent, Component } from "@flamework/components";
import { AbstractEquippable } from "./abstract-equippable";

@Component()
export abstract class AbstractCharacter extends BaseComponent<{}, Model> {
	static readonly TAG = "Character";

	protected abstract inventory: Folder;

	abstract equip(equippable: AbstractEquippable): void;
	abstract unequip(equippable: AbstractEquippable): void;
}
