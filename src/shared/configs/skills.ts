import { AbstractPlayer } from "shared/components/abstract-player";

export enum SkillId {
	GOBLET_THROW = "Goblet Throw",
	POMMEL_STRIKE = "Pommel Strike",
}

export interface SkillConfig {
	readonly cooldown: number;
	readonly learnPredicate: (player: AbstractPlayer) => boolean;
}

export const ITEMS: Record<SkillId, SkillConfig> = {
	"Goblet Throw": {
		cooldown: 2,
		learnPredicate: (player) => {
			return true;
		},
	},
	"Pommel Strike": {
		cooldown: 12,
		learnPredicate: (player) => {
			return true;
		},
	},
};
