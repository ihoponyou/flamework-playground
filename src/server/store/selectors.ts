import { createSelector } from "@rbxts/reflex";
import { DEFAULT_PLAYER_PROFILE_DATA, PlayerProfileData } from "shared/store/player-data";
import { RootServerState } from ".";

export function selectPlayer(player: Player) {
	return (state: RootServerState) => state.get(tostring(player.UserId));
}

export function selectPlayerInventory(player: Player) {
	return createSelector(selectPlayer(player), (state) => state?.inventory);
}

export function selectPlayerData(player: Player) {
	return createSelector(selectPlayerInventory(player), (inventory) => {
		return {
			inventory: inventory ?? DEFAULT_PLAYER_PROFILE_DATA.inventory,
		} as PlayerProfileData;
	});
}
