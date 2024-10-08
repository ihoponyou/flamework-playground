import { DEFAULT_INVENTORY_STATE, InventoryState } from "./slices/inventory";

// player profile may not include all slices, so we shouldnt reuse sharedstate type
export interface PlayerProfileData {
	inventory: InventoryState;
}

export const DEFAULT_PLAYER_PROFILE_DATA: PlayerProfileData = {
	inventory: DEFAULT_INVENTORY_STATE,
};
