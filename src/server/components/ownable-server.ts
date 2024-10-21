import { Component } from "@flamework/components";
import { AbstractOwnable } from "shared/components/abstract-ownable";

@Component({
	tag: AbstractOwnable.TAG,
	defaults: {
		ownerId: 0,
	},
})
export class OwnableServer extends AbstractOwnable {
	setOwner(player?: Player) {
		this.attributes.ownerId = player?.UserId ?? 0;
	}
}
