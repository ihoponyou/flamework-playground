import Immut from "@rbxts/immut";
import { createProducer } from "@rbxts/reflex";
import { Array } from "@rbxts/sift";
import { MAX_HOTBAR_SLOTS } from "shared/constants";
import { PlayerProfileData } from "shared/store/player-data";
import { EquippableId } from "shared/types/equippable";

const EMPTY_VALUE = "";

export type HotbarState = ReadonlyArray<typeof EMPTY_VALUE | EquippableId>;

export const DEFAULT_HOTBAR_STATE: HotbarState = Array.create(12, EMPTY_VALUE);

export const hotbarSlice = createProducer(DEFAULT_HOTBAR_STATE, {
	loadPlayerData: (_state, data: PlayerProfileData) => {
		return data.hotbar;
	},

	addToHotbar: (state, id: EquippableId, slot?: number) => {
		if (state.includes(id)) return state;
		if (slot !== undefined && (slot < 0 || slot > MAX_HOTBAR_SLOTS - 1)) return state;

		return Immut.produce(state, (draft) => {
			// if no slot given, put it wherever it fits
			if (slot === undefined) {
				for (let i = 0; i < MAX_HOTBAR_SLOTS; i++) {
					if (state[i] === EMPTY_VALUE) {
						draft[i] = id;
						break;
					}
				}
			} else {
				if (state[slot] === EMPTY_VALUE) {
					draft[slot] = id;
				}
			}
		});
	},
});
