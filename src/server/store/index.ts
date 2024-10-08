import { combineProducers, InferState } from "@rbxts/reflex";
import slices from "shared/store/slices";
import { addMultiplayer } from "./enhancers/add-multiplayer";
import { broadcasterMiddleware } from "./middleware/broadcaster";

export const store = combineProducers({
	...slices,
})
	.enhance(addMultiplayer)
	.applyMiddleware(broadcasterMiddleware());

export type RootServerState = InferState<typeof store>;
