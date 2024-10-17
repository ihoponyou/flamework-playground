import React, { useRef } from "@rbxts/react";
import { useSelector } from "@rbxts/react-reflex";
import { selectIsBackpackOpen } from "client/store/slices/ui/selectors";
import { appRefContext } from "client/ui/context/appRef";
import { Backpack } from "./backpack";
import { Hotbar } from "./hotbar";

export function App() {
	const ref = useRef<ScreenGui>();
	const isBackpackOpen = useSelector(selectIsBackpackOpen());

	return (
		<screengui key={"app"} ref={ref} ResetOnSpawn={false} IgnoreGuiInset={true}>
			<appRefContext.Provider value={ref}>
				<Hotbar />
				{isBackpackOpen && <Backpack />}
			</appRefContext.Provider>
		</screengui>
	);
}
