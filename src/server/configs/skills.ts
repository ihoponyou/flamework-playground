import { ClassId } from "shared/configs/classes";
import { SkillId } from "shared/types/skill-id";
import { WeaponType } from "shared/types/weapon-type";

export interface SkillConfig {
	readonly cooldown: number;
	readonly weaponXpRequired: Record<WeaponType, number>;
	readonly requiredClasses: ReadonlyArray<ClassId>;
	readonly requiredWeaponType: WeaponType | undefined;
}

export const SKILLS: Record<SkillId, SkillConfig> = {
	"Goblet Throw": {
		cooldown: 2,
		weaponXpRequired: {
			[WeaponType.DAGGER]: 0,
			[WeaponType.FIST]: 0,
			[WeaponType.SPEAR]: 0,
			[WeaponType.SWORD]: 0,
		},
		requiredClasses: [],
		requiredWeaponType: undefined,
	},
	"Pommel Strike": {
		cooldown: 12,
		weaponXpRequired: {
			[WeaponType.DAGGER]: 0,
			[WeaponType.FIST]: 0,
			[WeaponType.SPEAR]: 0,
			[WeaponType.SWORD]: 10,
		},
		requiredClasses: [ClassId.WARRIOR],
		requiredWeaponType: WeaponType.SWORD,
	},
};
