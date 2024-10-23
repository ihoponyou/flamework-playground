import { AbstractCharacter } from "shared/components/abstract-character";
import { ItemId } from "./item-id";
import { SkillId } from "./skill-id";

export type EquippableId = ItemId | SkillId;

export interface EquippableAttributes {
	isEquipped: boolean;
}

export interface Equippable {
	equip(equipper: AbstractCharacter): void;
	unequip(unequipper: AbstractCharacter): void;
	isEquipped(): boolean;
	onEquipChanged(callback: (isEquipped: boolean) => void): RBXScriptConnection;
}
