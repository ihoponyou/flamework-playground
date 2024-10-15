import Immut from "@rbxts/immut";
import { createProducer } from "@rbxts/reflex";
import { Array } from "@rbxts/sift";
import { ItemId, ITEMS } from "shared/configs/items";
import { MAX_HOTBAR_SLOTS } from "shared/constants";
import { PlayerProfileData } from "shared/store/player-data";

const EMPTY_VALUE = "";

export interface InventoryState {
	readonly items: ReadonlyMap<ItemId, number>;
	readonly hotbar: ReadonlyArray<ItemId | typeof EMPTY_VALUE>;
}

export const DEFAULT_INVENTORY_STATE: InventoryState = {
	items: new Map(),
	hotbar: Array.create<typeof EMPTY_VALUE | ItemId>(12, EMPTY_VALUE),
};

export const inventorySlice = createProducer(DEFAULT_INVENTORY_STATE, {
	loadPlayerData: (_state, data: PlayerProfileData) => {
		return data.inventory;
	},

	addItem: (state, item: ItemId, quantity: number = 1) => {
		const currentQuantity = state.items.get(item) ?? 0;
		const maxQuantity = ITEMS[item].maxQuantity;
		if (currentQuantity >= maxQuantity) {
			warn(`tried to add item "${item}" while >= max quantity (current:${currentQuantity} max:${maxQuantity})`);
			return state;
		}
		const newQuantity = math.min(currentQuantity + quantity, maxQuantity);

		// TODO: probably move this to a separate action
		let existsInHotbar = false;
		let openSlot = -1;
		for (let i = 0; i < MAX_HOTBAR_SLOTS; i++) {
			const occupier = state.hotbar[i];
			if (occupier === EMPTY_VALUE && openSlot === -1) {
				openSlot = i;
			}
			if (occupier === item) {
				existsInHotbar = true;
				break;
			}
		}

		return Immut.produce(state, (draft) => {
			draft.items.set(item, newQuantity);
			if (!existsInHotbar && openSlot > -1) {
				draft.hotbar[openSlot] = item;
			}
		});
	},

	removeItem: (state, item: ItemId, quantity: number = 1) => {
		const currentQuantity = state.items.get(item) ?? 0;
		if (currentQuantity === 0) {
			warn(`tried to remove item "${item}", but quantity = 0 (current:${currentQuantity})`);
			return state;
		}
		const newQuantity = math.max(0, currentQuantity - quantity);
		return Immut.produce(state, (draft) => {
			draft.items.set(item, newQuantity);
		});
	},
});
