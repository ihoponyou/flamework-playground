import { RootState } from ".";

export function selectPlayer(player: Player) {
	return (state: RootState) => state.get(tostring(player.UserId));
}
