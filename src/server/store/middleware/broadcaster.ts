import { createBroadcaster, ProducerMiddleware } from "@rbxts/reflex";
import { Events } from "server/network";
import { DATABASE_ACTIONS, SHARED_SLICES } from "shared/store";

export function broadcasterMiddleware(): ProducerMiddleware {
	const broadcaster = createBroadcaster({
		producers: SHARED_SLICES,
		beforeDispatch: (player, action) => {
			if (!DATABASE_ACTIONS.has(action.name)) return action;
			if (action.arguments[0] !== player) return;
			(action.arguments as defined[]).shift();

			return action;
		},
		dispatch: (player, actions) => {
			Events.reflex.dispatch(player, actions);
		},
	});

	Events.reflex.start.connect((player) => {
		broadcaster.start(player);
	});

	return broadcaster.middleware;
}
