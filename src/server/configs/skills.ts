import { CharacterServer } from "server/components/character-server";
import { ClassId } from "shared/configs/classes";
import { SkillId } from "shared/modules/skill-id";
import { WeaponType } from "shared/modules/weapon-type";

export interface SkillConfig {
	readonly cooldown: number;
	readonly weaponXpRequired: Record<WeaponType, number>;
	readonly requiredClasses: ReadonlyArray<ClassId>;
	readonly requiredWeaponType: WeaponType | undefined;
	readonly activate: (user: CharacterServer) => void;
}

export enum TargetingStyle {
	ToCursor,
	Hitbox,
}

export enum TargetGroup {
	Friend,
	Foe,
}

export enum EffectTrigger {
	Immediate,
	OnHit,
	OnAnimationMarkerReached,
}

enum Effect {
	Damage,
	Knockback,
	Ragdoll,
	Stun,
}

abstract class AbstractEffect {}

class DamageEffect extends AbstractEffect {
	constructor(public readonly amount: number) {
		super();
	}
}

export enum KnockbackDirection {
	CasterToTarget,
	CasterLookVector,
}

class KnockbackEffect extends AbstractEffect {
	constructor(
		public readonly magnitude: number,
		public readonly ignoreGravity: boolean,
		public readonly direction: KnockbackDirection,
	) {
		super();
	}
}

interface Duration {
	readonly duration: number;
}

class RagdollEffect extends AbstractEffect implements Duration {
	constructor(public readonly duration: number) {
		super();
	}
}

class StunEffect extends AbstractEffect implements Duration {
	constructor(public readonly duration: number) {
		super();
	}
}

interface AbilityParams {
	animation?: Animation;
	manaCost: number;
	cooldown: number;
	targeting: {
		style: TargetingStyle;
		ignoredCollisionGroups: string[];
	};
	triggeredEffects: Array<{
		targetedGroups: TargetGroup[];
		triggeredBy: EffectTrigger;
		effectsToApply: AbstractEffect[];
	}>;
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
		activate: (user) => {
			print("threw a goblet");
		},
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
		activate: (user) => {
			print("struck a pommel");
		},
	},
};
