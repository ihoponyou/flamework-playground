import { createProducer } from "@rbxts/reflex";

export type Currency = "Silver";

export interface CurrencyData {
	readonly amount: number;
	readonly multiplier: number;
}

const initialState: Record<Currency, CurrencyData> = {
	Silver: {
		amount: 0,
		multiplier: 1,
	},
};

export const currenciesSlice = createProducer(initialState, {
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
