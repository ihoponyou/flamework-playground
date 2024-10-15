import { Component, Components } from "@flamework/components";
import { Modding, OnStart } from "@flamework/core";
import { SKILLS } from "server/configs/skills";
import { AbstractSkill } from "shared/components/abstract-skill";
import { SkillId } from "shared/skill-id";
import { CharacterServer } from "./character-server";

@Component({
	tag: AbstractSkill.TAG,
	defaults: {
		isEquipped: false,
	},
})
export class SkillServer extends AbstractSkill implements OnStart {
	static async instantiateSkill(name: SkillId, parent?: Instance): Promise<SkillServer> {
		const newItem = new Instance("Tool");
		newItem.Parent = script;

		newItem.AddTag(this.TAG);
		newItem.Name = name;

		return Modding.resolveSingleton(Components)
			.waitForComponent<SkillServer>(newItem)
			.andThen((item) => {
				newItem.Parent = parent ?? script;
				return item;
			});
	}

	public readonly config = SKILLS[this.instance.Name as SkillId];

	onStart(): void {
		if (this.config === undefined) {
			error(`skill config not found for ${this.instance.Name}`);
		}
	}

	override equip(equipper: CharacterServer): void {}
	override unequip(unequipper: CharacterServer): void {}
	override use(user: CharacterServer): void {}
}
