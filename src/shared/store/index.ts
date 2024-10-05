import Object from "@rbxts/object-utils";
import { CombineStates } from "@rbxts/reflex";
import { currenciesSlice, DEFAULT_CURRENCIES_STATE } from "./slices/currencies";
import { DEFAULT_INVENTORY_STATE, inventorySlice } from "./slices/inventory";

export type SharedState = CombineStates<typeof SHARED_SLICES>;

export const SHARED_SLICES = {
	currencies: currenciesSlice,
	inventory: inventorySlice,
};

export const DEFAULT_PLAYER_DATA = {
	currencies: DEFAULT_CURRENCIES_STATE,
	inventory: DEFAULT_INVENTORY_STATE,
};

export type PlayerData = typeof DEFAULT_PLAYER_DATA;

export const DATABASE_ACTIONS = new Set<string>();
for (const slice of Object.values(SHARED_SLICES)) {
	for (const actionName of Object.keys(slice.getActions()) as Array<string>) {
		DATABASE_ACTIONS.add(actionName);
	}
}
