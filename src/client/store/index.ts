import { combineProducers, InferState } from "@rbxts/reflex";
import slices from "shared/store/slices";
import { receiverMiddleware } from "./middleware/receiver";

export const store = combineProducers({
	...slices,
}).applyMiddleware(receiverMiddleware());

export type RootClientState = InferState<typeof store>;
