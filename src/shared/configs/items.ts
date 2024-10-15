import { R6BodyPart } from "shared/r6-body-part";

export enum ItemId {
	GOBLET = "Goblet",
	BRONZE_SWORD = "Bronze Sword",
}

export interface ItemConfig {
	readonly maxQuantity: number;
	readonly holsterPart: R6BodyPart;
	readonly holsterC0: CFrame;
	readonly equipC0: CFrame;
	readonly hideOnHolster: boolean;
}

export const ITEMS: Record<ItemId, ItemConfig> = {
	Goblet: {
		maxQuantity: 99,
		holsterPart: "Torso",
		holsterC0: CFrame.identity,
		equipC0: new CFrame(0, -0.14, 0).mul(CFrame.fromOrientation(math.rad(-100), 0, 0)),
		hideOnHolster: true,
	},
	"Bronze Sword": {
		maxQuantity: 1,
		holsterPart: "Torso",
		holsterC0: new CFrame(0, 0, -2),
		equipC0: CFrame.identity,
		hideOnHolster: false,
	},
};
