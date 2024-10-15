import { Controller, OnStart } from "@flamework/core";
import React, { StrictMode } from "@rbxts/react";
import { ReflexProvider } from "@rbxts/react-reflex";
import { createPortal, createRoot } from "@rbxts/react-roblox";
import { ContextActionService, StarterGui } from "@rbxts/services";
import { LOCAL_PLAYER_GUI } from "client/constants";
import { store } from "client/store";
import { selectIsBackpackOpen } from "client/store/slices/ui/selectors";
import { App } from "client/ui/components/app";

@Controller()
export class UiController implements OnStart {
	private root = createRoot(new Instance("Folder"));

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
				<ReflexProvider producer={store}>{createPortal(<App />, LOCAL_PLAYER_GUI)}</ReflexProvider>
			</StrictMode>,
		);
	}
}
