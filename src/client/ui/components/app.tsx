import React, { useRef } from "@rbxts/react";
import { useSelector } from "@rbxts/react-reflex";
import { selectEquippables } from "client/store/slices/equippables/selectors";
import { selectIsBackpackOpen } from "client/store/slices/ui/selectors";
import { appRefContext } from "client/ui/context/app-ref";
import { MAX_HOTBAR_SLOTS } from "shared/constants";
import { selectHotbar } from "shared/store/slices/hotbar/selectors";
import { selectInventory } from "shared/store/slices/inventory/selectors";
import { EquippableId } from "shared/types/equippable";
import { ItemId } from "shared/types/item-id";
import { Backpack } from "./backpack";
import { DraggableEquippableButton } from "./draggable-equippable-button";
import { EquippableButton } from "./equippable-button";
import { Hotbar } from "./hotbar";

export function App() {
	const ref = useRef<ScreenGui>();
	const isBackpackOpen = useSelector(selectIsBackpackOpen());
	const hotbar = useSelector(selectHotbar());
	const inventory = useSelector(selectInventory());
	const equippables = useSelector(selectEquippables());

	const hotbarButtons = new Array<React.Element>();
	const backpackButtons = new Array<React.Element>();
	for (const [id, equippable] of equippables) {
		const quantity = inventory.get(id as ItemId);
		const slot = hotbar.indexOf(id as EquippableId);
		if (slot !== -1) {
			if (isBackpackOpen) {
				hotbarButtons.push(
					<DraggableEquippableButton
						slot={slot}
						equippable={equippable}
						equippableName={id}
						position={UDim2.fromScale(slot / (MAX_HOTBAR_SLOTS - 1), 0)}
						quantity={quantity}
					/>,
				);
				continue;
			}
			hotbarButtons.push(
				<EquippableButton slot={slot} equippable={equippable} equippableName={id} quantity={quantity} />,
			);
			continue;
		}

		backpackButtons.push(
			<DraggableEquippableButton equippable={equippable} equippableName={id} quantity={quantity} />,
		);
	}

	return (
		<screengui key={"app"} ref={ref} ResetOnSpawn={false} IgnoreGuiInset={true}>
			<appRefContext.Provider value={ref}>
				<Hotbar>{hotbarButtons}</Hotbar>
				{isBackpackOpen && <Backpack>{backpackButtons}</Backpack>}
			</appRefContext.Provider>
		</screengui>
	);
}
