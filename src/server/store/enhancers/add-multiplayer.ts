/* eslint-disable roblox-ts/no-any */
import type { InferActions, InferState, Producer } from "@rbxts/reflex";
import { createProducer } from "@rbxts/reflex";
import { Dictionary } from "@rbxts/sift";

// credit to sasial

type InsertPlayerParameter<State, Actions> = {
	readonly [K in keyof Actions]: Actions[K] extends (state: State, ...args: infer Args) => State
		? (state: State, player: Player, ...args: Args) => State
		: never;
};

export function addMultiplayer<
	P extends Producer,
	S = InferState<P>,
	A = InsertPlayerParameter<Map<string, S>, InferActions<P>>,
>(producer: P): Producer<Map<string, S>, A> {
	const actions = Dictionary.map(
		producer.getActions() as Record<string, (state: S, ...args: unknown[]) => S>,
		(action) => {
			return (stateMap: Map<string, S>, player: Player, ...args: unknown[]) => {
				const id = tostring(player.UserId);
				// the producer's state will always be empty? idk
				const currentState: S = stateMap.get(id) ?? (producer.getState() as S);
				const nextState = table.clone(stateMap);
				nextState.set(id, action(currentState, ...args));

				return nextState;
			};
		},
	) as never;

	return createProducer(new Map(), actions);
}
