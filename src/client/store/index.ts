import { combineProducers, InferState } from "@rbxts/reflex";
import slices from "shared/store/slices";
import { receiverMiddleware } from "./middleware/receiver";
import { uiSlice } from "./slices/ui";

export const store = combineProducers({
	...slices,
	ui: uiSlice,
}).applyMiddleware(receiverMiddleware());

export type RootClientState = InferState<typeof store>;
