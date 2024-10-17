import { useContext } from "@rbxts/react";
import { useSelector } from "@rbxts/react-reflex";
import { appRefContext } from "client/ui/context/appRef";
import { selectHotbar } from "shared/store/slices/hotbar/selectors";
import { ItemId } from "shared/types/item-id";
import { EquippableButtonProps } from "./equippable-button";

export function DraggableEquippableButton(props: EquippableButtonProps) {
	const appRef = useContext(appRefContext);

	const hotbar = useSelector(selectHotbar());
	const inHotbar = hotbar.includes(props.equippableName as ItemId);

	return;
}
