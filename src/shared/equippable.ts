import { AbstractCharacter } from "./components/abstract-character";

export interface Equippable {
	equip(equipper: AbstractCharacter): void;
	unequip(unequipper: AbstractCharacter): void;
	isEquipped(): boolean;
}
