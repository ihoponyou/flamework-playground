import { Modding } from "@flamework/core";
import { createContext } from "@rbxts/react";
import { CharacterController } from "client/controllers/character-controller";

// TODO: not use dependency macro
export const controllerContext = createContext({
	character: Modding.resolveSingleton(CharacterController),
});
