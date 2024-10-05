import { combineProducers, InferState } from "@rbxts/reflex";
import { SHARED_SLICES } from "shared/store";
import { receiverMiddleware } from "./middleware/receiver";

export const producer = combineProducers({
	...SHARED_SLICES,
}).applyMiddleware(receiverMiddleware());

export type RootState = InferState<typeof producer>;
