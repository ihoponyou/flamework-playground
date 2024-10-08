import { createProducer } from "@rbxts/reflex";
import { PlayerProfileData } from "shared/store/player-data";

enum Item {
	GOBLET = "Goblet",
	BRONZE_SWORD = "Bronze Sword",
}

export const ITEMS: Record<Item, number> = {
	Goblet: 99,
	"Bronze Sword": 1,
};

export interface InventoryState {
	readonly items: ReadonlyMap<Item, number>;
	readonly hotbar: ReadonlyMap<number, Item>;
}

export const DEFAULT_INVENTORY_STATE: InventoryState = {
	items: new Map(),
	hotbar: new Map(),
};

export const inventorySlice = createProducer(DEFAULT_INVENTORY_STATE, {
	loadPlayerData: (_state, data: PlayerProfileData) => {
		return data.inventory;
	},
});
