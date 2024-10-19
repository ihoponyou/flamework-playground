import { Components } from "@flamework/components";
import { Controller, OnStart } from "@flamework/core";
import React, { StrictMode } from "@rbxts/react";
import { ReflexProvider } from "@rbxts/react-reflex";
import { createPortal, createRoot } from "@rbxts/react-roblox";
import { ContextActionService, StarterGui } from "@rbxts/services";
import { LOCAL_PLAYER_GUI } from "client/constants";
import { store } from "client/store";
import { selectIsBackpackOpen } from "client/store/slices/ui/selectors";
import { App } from "client/ui/components/app";
import { singletonContext } from "client/ui/context/singleton";
import { CharacterController } from "./character-controller";

@Controller()
export class UiController implements OnStart {
	private root = createRoot(new Instance("Folder"));

	constructor(private components: Components, private characterController: CharacterController) {}

	onStart(): void {
		StarterGui.SetCoreGuiEnabled(Enum.CoreGuiType.Backpack, false);

		this.bindToggleBackpack();

		this.root.render(
			<StrictMode>
				<singletonContext.Provider value={{ character: this.characterController, components: this.components }}>
					<ReflexProvider producer={store}>{createPortal(<App />, LOCAL_PLAYER_GUI)}</ReflexProvider>
				</singletonContext.Provider>
			</StrictMode>,
		);
	}

	private bindToggleBackpack(): void {
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
	}

	private bindHotbarSlot(slot: number): void {
		// get key associated with slot
		// bind an action to that key which will equip/unequip whatever is at that slot
	}
}
