export enum Item {
	GOBLET = "Goblet",
	BRONZE_SWORD = "Bronze Sword",
}

export interface ItemConfig {
	maxQuantity: number;
}

export const ITEMS: Record<Item, ItemConfig> = {
	Goblet: {
		maxQuantity: 99,
	},
	"Bronze Sword": {
		maxQuantity: 1,
	},
};
