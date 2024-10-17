import { Modding } from "@flamework/core";
import { createContext } from "@rbxts/react";
import { CharacterController } from "client/controllers/character-controller";

export const controllersContext = createContext({
	character: Modding.resolveSingleton(CharacterController),
});
