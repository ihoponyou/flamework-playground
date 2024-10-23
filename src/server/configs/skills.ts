import { ClassId } from "shared/configs/classes";
import { SkillId } from "shared/types/skill-id";
import { WeaponType } from "shared/types/weapon-type";

export interface SkillConfig {
	readonly cooldown: number;
	readonly weaponXpRequired: Record<WeaponType, number>;
	readonly requiredClasses: ReadonlyArray<ClassId>;
	readonly requiredWeaponType: WeaponType | undefined;
}

enum EffectAction {
	Teleport,
	Animate,
	Ragdoll,
	ApplyStatus,
}

enum EffectActionActivationType {
	OnAnimationFinished = "ON_ANIM_FINISHED",
	OnAnimationMarkerReached = "ON_ANIM_MARKER_REACHED",
	OnUse = "ON_USE",
	OnCancel = "ON_CANCEL",
}

enum EffectDurationType {
	Immediate,
	ContinuousOverTime, // poison ticking
	DiscreteOverTime, // burn ticks
}

enum SkillRestriction {
	Cooldown,
	Weapon,
}

interface Effect {
	action: EffectAction;
	durationType: EffectDurationType;
}

export interface ActiveSkillConfig {
	readonly effects: Record<EffectActionActivationType, ReadonlyArray<Effect>>;
	readonly restrictions: ReadonlyArray<SkillRestriction>;
	readonly animation?: Animation;
}

const POMMEL_STRIKE: ActiveSkillConfig = {
	effects: {
		ON_ANIM_FINISHED: [],
		ON_ANIM_MARKER_REACHED: [],
		ON_CANCEL: [],
		ON_USE: [],
	},
	restrictions: [],
};

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
