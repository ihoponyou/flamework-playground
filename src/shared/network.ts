import { Networking } from "@flamework/networking";
import { BroadcastAction } from "@rbxts/reflex";
import { SharedState } from "./store";
import { EquippableId } from "./types/equippable";

interface ClientToServerEvents {
	reflex: {
		start(): void;
	};
	equip(equippable: Instance, shouldEquip: boolean): void;
	addToHotbar(equippableId: EquippableId, hotbarSlot: number): void;
	removeFromHotbar(equippableId: EquippableId): void;
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
