import { AbstractCharacter } from "./components/abstract-character";

export interface EquippableAttributes {
	isEquipped: boolean;
}

export interface Equippable {
	equip(equipper: AbstractCharacter): void;
	unequip(unequipper: AbstractCharacter): void;
	isEquipped(): boolean;
}
