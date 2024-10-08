import { BaseComponent, Component } from "@flamework/components";

@Component({
	tag: Ownable.TAG,
})
export class Ownable extends BaseComponent {
	static readonly TAG = "Ownable";

	private owner?: Player;

	public getOwner(): Player | undefined {
		return this.owner;
	}

	public setOwner(owner: Player): void {
		this.owner = owner;
	}

	public hasOwner(): boolean {
		return this.owner !== undefined;
	}

	public isOwnedBy(player: Player): boolean {
		return this.owner === player;
	}
}
