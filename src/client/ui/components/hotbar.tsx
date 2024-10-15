import React from "@rbxts/react";
import { useSelector } from "@rbxts/react-reflex";
import { selectEquippables } from "client/store/slices/equippables/selectors";
import { selectIsBackpackOpen } from "client/store/slices/ui/selectors";
import { MAX_HOTBAR_SLOTS } from "shared/constants";
import { selectHotbar } from "shared/store/slices/inventory/selectors";
import { EmptySlot } from "./empty-slot";
import { EquippableButton } from "./equippable-button";

const PX_PER_SLOT = 72;
const MAX_HOTBAR_SIZE_X_PX = MAX_HOTBAR_SLOTS * PX_PER_SLOT;

export function Hotbar() {
	const isBackpackOpen = useSelector(selectIsBackpackOpen());
	const hotbar = useSelector(selectHotbar());
	const equippables = useSelector(selectEquippables());

	const sizeX = isBackpackOpen ? MAX_HOTBAR_SIZE_X_PX : PX_PER_SLOT * (hotbar.size() - 1);

	return (
		<frame
			key="Hotbar"
			AnchorPoint={new Vector2(0.5, 1)}
			BackgroundTransparency={1}
			Position={new UDim2(0.5, 0, 1, -10)}
			Size={UDim2.fromOffset(sizeX, 60)}
		>
			{true && (
				<uilistlayout
					FillDirection={Enum.FillDirection.Horizontal}
					HorizontalAlignment={Enum.HorizontalAlignment.Center}
					Padding={new UDim(0, 10)}
					SortOrder={Enum.SortOrder.LayoutOrder}
				/>
			)}
			{hotbar.map((id, slot) => {
				const equippable = equippables.get(id);
				if (equippable === undefined) {
					return <EmptySlot />;
				}
				return <EquippableButton key={slot} equippable={equippable} equippableName={id} />;
			})}
		</frame>
	);
}
