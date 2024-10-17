import { Controller, OnStart } from "@flamework/core";
import React, { StrictMode } from "@rbxts/react";
import { ReflexProvider } from "@rbxts/react-reflex";
import { createPortal, createRoot } from "@rbxts/react-roblox";
import { ContextActionService, StarterGui } from "@rbxts/services";
import { LOCAL_PLAYER_GUI } from "client/constants";
import { Events } from "client/network";
import { store } from "client/store";
import { selectIsBackpackOpen } from "client/store/slices/ui/selectors";
import { App } from "client/ui/components/app";
import { controllersContext } from "client/ui/context/controllers";
import { EquippableId } from "shared/types/equippable";
import { CharacterController } from "./character-controller";

@Controller()
export class UiController implements OnStart {
	private root = createRoot(new Instance("Folder"));

	constructor(private characterController: CharacterController) {}

	onStart(): void {
		StarterGui.SetCoreGuiEnabled(Enum.CoreGuiType.Backpack, false);

		ContextActionService.BindAction(
			"toggle_backpack_open",
			(_, state) => {
				if (state !== Enum.UserInputState.Begin) {
					return Enum.ContextActionResult.Pass;
				}
				const currentlyOpen = store.getState(selectIsBackpackOpen());
				store.toggleBackpackOpen(!currentlyOpen);

				return Enum.ContextActionResult.Pass;
			},
			true,
			Enum.KeyCode.Backquote,
		);

		this.root.render(
			<StrictMode>
				<controllersContext.Provider value={{ character: this.characterController, ui: this }}>
					<ReflexProvider producer={store}>{createPortal(<App />, LOCAL_PLAYER_GUI)}</ReflexProvider>
				</controllersContext.Provider>
			</StrictMode>,
		);
	}

	moveEquippableToHotbar(id: EquippableId, slot: number) {
		Events.moveEquippableInInventory(id, slot);
	}

	moveEquippableToBackpack(id: EquippableId) {
		Events.moveEquippableInInventory(id);
	}
}
