import { combineProducers, InferState } from "@rbxts/reflex";
import { slices } from "shared/store";
import { receiverMiddleware } from "./middleware/receiver";

export const producer = combineProducers({
	...slices,
}).applyMiddleware(receiverMiddleware());

export type RootState = InferState<typeof producer>;
