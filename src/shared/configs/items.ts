import { R6BodyPart } from "shared/r6-body-part";

export enum ItemId {
	GOBLET = "Goblet",
	BRONZE_SWORD = "Bronze Sword",
}

export interface ItemConfig {
	maxQuantity: number;
	holsterLimb: R6BodyPart;
	equipLimb: R6BodyPart;
}

export const ITEMS: Record<ItemId, ItemConfig> = {
	Goblet: {
		maxQuantity: 99,
		holsterLimb: "Torso",
		equipLimb: "Right Arm",
	},
	"Bronze Sword": {
		maxQuantity: 1,
		holsterLimb: "Torso",
		equipLimb: "Right Arm",
	},
};
