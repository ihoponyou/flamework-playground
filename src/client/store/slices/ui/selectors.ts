import { RootClientState } from "client/store";

export function selectIsBackpackOpen() {
	return (state: RootClientState) => state.ui.isBackpackOpen;
}
