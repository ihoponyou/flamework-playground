import { BaseComponent, Component } from "@flamework/components";
import { OnStart } from "@flamework/core";
import { ItemId, ITEMS } from "shared/configs/items";
import { Equippable, EquippableAttributes } from "shared/equippable";
import { Useable } from "shared/useable";
import { AbstractCharacter } from "./abstract-character";

interface SkillAttributes extends EquippableAttributes {}

@Component()
export abstract class AbstractSkill extends BaseComponent<SkillAttributes> implements OnStart, Equippable, Useable {
	static readonly TAG = "Skill";

	public readonly config = ITEMS[this.instance.Name as ItemId];

	abstract equip(equipper: AbstractCharacter): void;
	abstract unequip(unequipper: AbstractCharacter): void;

	abstract use(user: AbstractCharacter): void;

	onStart(): void {
		if (this.config === undefined) {
			error(`skill config not found for ${this.instance.Name}`);
		}
	}

	canBeEquippedBy(character: AbstractCharacter): boolean {
		return true;
	}

	isEquipped(): boolean {
		return this.attributes.isEquipped;
	}
}
