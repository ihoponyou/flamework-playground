import type { InferActions, InferState, Producer } from "@rbxts/reflex";
import { createProducer } from "@rbxts/reflex";
import { Dictionary as Object } from "@rbxts/sift";

// credit to sasial

type ReplaceStateParameters<State, Actions> = {
	readonly // eslint-disable-next-line @typescript-eslint/no-explicit-any
	[K in keyof Actions]: Actions[K] extends (state: any, ...args: infer Args) => any
		? (state: State, player: Player, ...args: Args) => State
		: never;
};

export function createMutiplayer<
	P extends Producer,
	S = InferState<P>,
	A = ReplaceStateParameters<Map<Player, S>, InferActions<P>>,
>(producer: P): Producer<Map<Player, S>, A> {
	const actions = Object.map(
		producer.getActions() as Record<string, (state: S, ...args: unknown[]) => S>,
		(action) => {
			return (combinedState: Map<Player, S>, player: Player, ...args: unknown[]) => {
				const nextState = table.clone(combinedState);

				if (!nextState.has(player)) {
					nextState.set(player, producer.getState());
				}

				const producerState = nextState.get(player)!;
				nextState.set(player, action(producerState, ...args));

				return nextState;
			};
		},
	) as never;

	return createProducer(new Map(), actions);
}
