import { BaseComponent, Component } from "@flamework/components";
import { Players } from "@rbxts/services";

interface OwnableAttributes {
	ownerId: number;
}

@Component({
	tag: AbstractOwnable.TAG,
})
export class AbstractOwnable extends BaseComponent<OwnableAttributes> {
	static readonly TAG = "Ownable";

	getOwner(): Player | undefined {
		return Players.GetPlayerByUserId(this.attributes.ownerId);
	}

	hasOwner(): boolean {
		return this.attributes.ownerId !== undefined;
	}

	isOwnedBy(player: Player): boolean {
		return this.attributes.ownerId === player.UserId;
	}
}
