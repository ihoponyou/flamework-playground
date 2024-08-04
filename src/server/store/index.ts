import { combineProducers, InferState } from "@rbxts/reflex";
import { slices } from "shared/store";
import { createMutiplayer } from "./create-multiplayer";
import { broadcasterMiddleware } from "./middleware/broadcaster";

export const producer = combineProducers({
	...slices,
})
	.enhance(createMutiplayer)
	.applyMiddleware(broadcasterMiddleware());

export type RootState = InferState<typeof producer>;
