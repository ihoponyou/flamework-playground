import { BaseComponent, Component } from "@flamework/components";
import { Equippable, EquippableAttributes } from "shared/types/equippable";
import { Useable } from "shared/types/useable";
import { AbstractCharacter } from "./abstract-character";

interface SkillAttributes extends EquippableAttributes {}

@Component()
export abstract class AbstractSkill extends BaseComponent<SkillAttributes> implements Equippable, Useable {
	static readonly TAG = "Skill";

	abstract equip(equipper: AbstractCharacter): void;
	abstract unequip(unequipper: AbstractCharacter): void;

	abstract use(user: AbstractCharacter): void;

	onEquipChanged(callback: (isEquipped: boolean) => void): RBXScriptConnection {
		return this.onAttributeChanged("isEquipped", (newValue) => callback(newValue));
	}

	isEquipped(): boolean {
		return this.attributes.isEquipped;
	}
}
