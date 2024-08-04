import { createProducer } from "@rbxts/reflex";
import { PlayerData } from "shared/store";

export type Currency = "Silver";

interface CurrencyData {
	readonly amount: number;
	readonly multiplier: number;
}

export type CurrenciesState = Record<Currency, CurrencyData>;

export const DEFAULT_CURRENCIES_STATE: CurrenciesState = {
	Silver: {
		amount: 0,
		multiplier: 1,
	},
};

export const currenciesSlice = createProducer(DEFAULT_CURRENCIES_STATE, {
	loadPlayerData: (state, data: PlayerData) => {
		return data.currencies;
	},

	setCurrencyAmount: (state, currency: Currency, amount: number) => {
		return {
			...state,
			[currency]: {
				...state[currency],
				amount: amount,
			},
		};
	},

	setCurrencyMultiplier: (state, currency: Currency, multiplier: number) => {
		return {
			...state,
			[currency]: {
				...state[currency],
				multiplier: multiplier,
			},
		};
	},

	addCurrency: (state, currency: Currency, amount: number) => {
		const currentData = state[currency];
		return {
			...state,
			[currency]: {
				...currentData,
				amount: currentData.amount + amount,
			},
		};
	},
});
