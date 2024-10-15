import { SharedState } from "shared/store";

export function selectItems() {
	return (state: SharedState) => state.inventory.items;
}

export function selectHotbar() {
	return (state: SharedState) => state.inventory.hotbar;
}
