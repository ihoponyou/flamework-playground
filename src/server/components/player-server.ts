import { BaseComponent, Component } from "@flamework/components";
import { Players } from "@rbxts/services";
import { TechTree } from "server/tech-tree";
import { TechType } from "server/tech-tree/tech";

@Component({
	tag: "Player",
	ancestorWhitelist: [Players],
})
export class PlayerServer extends BaseComponent<{}, Player> {
	private techTree = new TechTree();

	public unlockTech(techType: TechType): boolean {
		return this.techTree.unlock(techType);
	}
}
