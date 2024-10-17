import React, { useRef } from "@rbxts/react";
import { useSelector } from "@rbxts/react-reflex";
import { selectEquippables } from "client/store/slices/equippables/selectors";
import { selectIsBackpackOpen } from "client/store/slices/ui/selectors";
import { appRefContext } from "client/ui/context/app-ref";
import { MAX_HOTBAR_SLOTS } from "shared/constants";
import { selectHotbar } from "shared/store/slices/hotbar/selectors";
import { Backpack } from "./backpack";
import { DraggableEquippableButton } from "./draggable-equippable-button";
import { EquippableButton } from "./equippable-button";
import { Hotbar } from "./hotbar";

export function App() {
	const ref = useRef<ScreenGui>();
	const isBackpackOpen = useSelector(selectIsBackpackOpen());
	const hotbar = useSelector(selectHotbar());
	const equippables = useSelector(selectEquippables());

	const itemsProcessed = 0;
	return (
		<screengui key={"app"} ref={ref} ResetOnSpawn={false} IgnoreGuiInset={true}>
			<appRefContext.Provider value={ref}>
				<Hotbar>
					{hotbar.map((id, slot) => {
						const equippable = equippables.get(id);
						if (equippable === undefined) return;
						if (isBackpackOpen) {
							return (
								<DraggableEquippableButton
									slot={slot}
									equippable={equippable}
									equippableName={id}
									position={UDim2.fromScale(slot / (MAX_HOTBAR_SLOTS - 1), 0)}
								/>
							);
						} else {
							// position will be handled by uilistlayout
							return <EquippableButton slot={slot} equippable={equippable} equippableName={id} />;
						}
					})}
				</Hotbar>
				{isBackpackOpen && <Backpack />}
			</appRefContext.Provider>
		</screengui>
	);
}
