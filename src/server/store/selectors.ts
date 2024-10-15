import { createSelector } from "@rbxts/reflex";
import { RootServerState } from ".";

export function selectPlayer(player: Player) {
	return (state: RootServerState) => state.get(player);
}

// TODO: remember how psychotic this was
// export function selectPlayerData(player: Player) {
// 	return createSelector(selectPlayerInventory(player), selectPlayerSkills(player), (inventory, skills) => {
// 		return {
// 			inventory: inventory ?? DEFAULT_PLAYER_PROFILE_DATA.inventory,
// 			skills: skills ?? DEFAULT_PLAYER_PROFILE_DATA.skills,
// 		} as PlayerProfileData;
// 	});
// }

export function selectPlayerInventory(player: Player) {
	return createSelector(selectPlayer(player), (state) => state?.inventory);
}

export function selectPlayerSkills(player: Player) {
	return createSelector(selectPlayer(player), (state) => state?.skills);
}
