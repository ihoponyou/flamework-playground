import { combineProducers, InferState } from "@rbxts/reflex";
import { SHARED_SLICES } from "shared/store";
import { createMutiplayer } from "./create-multiplayer";
import { broadcasterMiddleware } from "./middleware/broadcaster";

export const producer = combineProducers({
	...SHARED_SLICES,
})
	.enhance(createMutiplayer)
	.applyMiddleware(broadcasterMiddleware());

export type RootState = InferState<typeof producer>;
