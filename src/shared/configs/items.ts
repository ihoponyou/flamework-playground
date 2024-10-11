export enum ItemId {
	GOBLET = "Goblet",
	BRONZE_SWORD = "Bronze Sword",
}

export interface ItemConfig {
	maxQuantity: number;
}

export const ITEMS: Record<ItemId, ItemConfig> = {
	Goblet: {
		maxQuantity: 99,
	},
	"Bronze Sword": {
		maxQuantity: 1,
	},
};
