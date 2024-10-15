import { BaseComponent, Component } from "@flamework/components";
import { Equippable, EquippableAttributes } from "shared/equippable";
import { Useable } from "shared/useable";
import { AbstractCharacter } from "./abstract-character";

interface SkillAttributes extends EquippableAttributes {}

@Component()
export abstract class AbstractSkill extends BaseComponent<SkillAttributes> implements Equippable, Useable {
	static readonly TAG = "Skill";

	abstract equip(equipper: AbstractCharacter): void;
	abstract unequip(unequipper: AbstractCharacter): void;

	abstract use(user: AbstractCharacter): void;

	isEquipped(): boolean {
		return this.attributes.isEquipped;
	}
}
