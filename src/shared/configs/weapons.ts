import { WeaponType } from "shared/modules/weapon-type";

interface WeaponConfig {
	type: WeaponType;
	damage: number;
	attackRate: number;
	equipPriority: number;
	droppable: boolean;
}

export const WEAPONS: { [name: string]: WeaponConfig } = {
	"Bronze Sword": {
		type: WeaponType.SWORD,
		damage: 1,
		attackRate: 1,
		equipPriority: 0,
		droppable: true,
	},
};
