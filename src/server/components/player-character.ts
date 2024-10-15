import { BaseComponent, Component, Components } from "@flamework/components";
import { OnStart } from "@flamework/core";
import { Players } from "@rbxts/services";
import { store } from "server/store";
import { selectPlayerItems, selectPlayerSkills } from "server/store/selectors";
import { ItemId } from "shared/configs/items";
import { SkillId } from "shared/skill-id";
import { CharacterServer } from "./character-server";
import { PlayerServer } from "./player-server";

@Component({
	tag: CharacterServer.TAG,
	predicate: (instance) => {
		return Players.GetPlayerFromCharacter(instance) !== undefined;
	},
})
export class PlayerCharacter extends BaseComponent<{}, Model> implements OnStart {
	private player!: PlayerServer;
	private unsubscribeFromInventory!: Callback;
	private unsubscribeFromSkills!: Callback;

	constructor(private components: Components, private character: CharacterServer) {
		super();
	}

	onStart(): void {
		this.player = this.components
			.waitForComponent<PlayerServer>(Players.GetPlayerFromCharacter(this.instance)!)
			.expect();

		const inventory = store.getState(selectPlayerItems(this.player.instance));
		if (inventory) this.updateInventoryFromState(inventory);
		this.unsubscribeFromInventory = store.subscribe(selectPlayerItems(this.player.instance), (state) =>
			this.updateInventoryFromState(state),
		);

		this.unsubscribeFromSkills = store.subscribe(selectPlayerSkills(this.player.instance), (state, prevState) =>
			this.updateSkillsFromState(state, prevState),
		);
	}

	override destroy(): void {
		this.unsubscribeFromInventory();
		this.unsubscribeFromSkills();

		super.destroy();
	}

	private updateInventoryFromState(items?: ReadonlyMap<ItemId, number>) {
		if (items === undefined) return;
		for (const [itemName, quantity] of items) {
			const existingItem = this.character.getItem(itemName);
			if (existingItem) {
				if (existingItem.attributes.quantity !== quantity) {
					existingItem.attributes.quantity = quantity;
				}
				continue;
			}

			this.character.giveItem(itemName, quantity);
		}
	}

	private updateSkillsFromState(skills?: ReadonlySet<SkillId>, prevSkills?: ReadonlySet<SkillId>) {
		if (skills === undefined) return;
		for (const skill of skills) {
			if (prevSkills && prevSkills.has(skill)) continue;
			this.character.learnSkill(skill);
		}
	}
}
