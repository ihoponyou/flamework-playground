import Immut from "@rbxts/immut";
import { createProducer } from "@rbxts/reflex";
import { PlayerProfileData } from "shared/store/player-data";
import { SkillId } from "shared/types/skill-id";

export type SkillsState = ReadonlySet<SkillId>;

export const DEFAULT_SKILLS_STATE: SkillsState = new Set<SkillId>();

export const skillsSlice = createProducer(DEFAULT_SKILLS_STATE, {
	loadPlayerData: (_state, data: PlayerProfileData) => {
		return data.skills;
	},

	addSkill: (state, id: SkillId) => {
		if (state.has(id)) return state;
		return new ReadonlySet([...state, id]);
	},

	removeSkill: (state, id: SkillId) => {
		if (!state.has(id)) return state;
		return Immut.produce(state, (draft) => {
			draft.delete(id);
		});
	},
});