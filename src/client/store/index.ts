import { combineProducers, InferState } from "@rbxts/reflex";
import slices from "shared/store/slices";
import { receiverMiddleware } from "./middleware/receiver";
import { equippablesSlice } from "./slices/equippables";
import { uiSlice } from "./slices/ui";

export const store = combineProducers({
	...slices,
	ui: uiSlice,
	equippables: equippablesSlice,
}).applyMiddleware(receiverMiddleware());

export type RootClientState = InferState<typeof store>;
