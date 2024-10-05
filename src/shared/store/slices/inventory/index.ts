import { createProducer } from "@rbxts/reflex";
import { PlayerData } from "shared/store";

export interface InventoryState {
	items: ReadonlyMap<string, number>;
	hotbar: ReadonlyMap<number, string>;
}

export const DEFAULT_INVENTORY_STATE: InventoryState = {
	items: new Map(),
	hotbar: new Map(),
};

const MAX_STACK_SIZE = 999;

export const inventorySlice = createProducer(DEFAULT_INVENTORY_STATE, {
	loadPlayerData: (state, data: PlayerData) => {
		return data.inventory;
	},

	addItem: (state, itemName: string, quantity: number) => {
		const currentCount = state.items.get(itemName) ?? 0;
		const newCount = math.min(MAX_STACK_SIZE, currentCount + quantity);
		const newItems = table.clone(state.items);
		newItems.set(itemName, newCount);

		return {
			...state,
			items: newItems,
		};
	},
	removeItem: (state, itemName: string, quantity: number) => {
		const currentCount = state.items.get(itemName) ?? 0;
		if (currentCount === 0) {
			return state;
		}

		const newCount = math.max(0, currentCount - quantity);
		const newItems = table.clone(state.items);
		if (newCount > 0) {
			newItems.delete(itemName);
		} else {
			newItems.set(itemName, newCount);
		}

		return {
			...state,
			items: newItems,
		};
	},
});
