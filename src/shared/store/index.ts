import { CombineStates } from "@rbxts/reflex";
import { currenciesSlice } from "./slices/currencies";

export type SharedState = CombineStates<typeof slices>;

export const slices = {
	currencies: currenciesSlice,
};
