import { DEFAULT_HOTBAR_STATE, HotbarState } from "./slices/hotbar";
import { DEFAULT_INVENTORY_STATE, InventoryState } from "./slices/inventory";
import { DEFAULT_SKILLS_STATE, SkillsState } from "./slices/skills";

// player profile may not include all slices, so we shouldnt reuse sharedstate type
export interface PlayerProfileData {
	inventory: InventoryState;
	skills: SkillsState;
	hotbar: HotbarState;
}

export const DEFAULT_PLAYER_PROFILE_DATA: PlayerProfileData = {
	inventory: DEFAULT_INVENTORY_STATE,
	skills: DEFAULT_SKILLS_STATE,
	hotbar: DEFAULT_HOTBAR_STATE,
};
