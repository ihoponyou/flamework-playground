import { Networking } from "@flamework/networking";
import { BroadcastAction } from "@rbxts/reflex";
import { SharedState } from "./store";

interface ClientToServerEvents {
	reflex: {
		start(): void;
	};
}

interface ServerToClientEvents {
	reflex: {
		dispatch(actions: Array<BroadcastAction>): void;
		hydrate(state: SharedState): void;
		start(): void;
	};
}

interface ClientToServerFunctions {}

interface ServerToClientFunctions {}

export const GlobalEvents = Networking.createEvent<ClientToServerEvents, ServerToClientEvents>();
export const GlobalFunctions = Networking.createFunction<ClientToServerFunctions, ServerToClientFunctions>();
