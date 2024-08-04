import { CombineStates } from "@rbxts/reflex";
import { currenciesSlice, CurrenciesState, DEFAULT_CURRENCIES_STATE } from "./slices/currencies";

export type SharedState = CombineStates<typeof slices>;

export const slices = {
	currencies: currenciesSlice,
};

export interface PlayerData {
	currencies: CurrenciesState;
}

export const DEFAULT_PLAYER_DATA: PlayerData = {
	currencies: DEFAULT_CURRENCIES_STATE,
};
