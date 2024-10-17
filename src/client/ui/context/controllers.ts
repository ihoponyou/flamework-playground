import { Modding } from "@flamework/core";
import { createContext } from "@rbxts/react";
import { CharacterController } from "client/controllers/character-controller";
import { UiController } from "client/controllers/ui-controller";

export const controllersContext = createContext({
	character: Modding.resolveSingleton(CharacterController),
	ui: Modding.resolveSingleton(UiController),
});
