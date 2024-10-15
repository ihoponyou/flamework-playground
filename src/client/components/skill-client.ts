import { Component } from "@flamework/components";
import { Events } from "client/network";
import { AbstractSkill } from "shared/components/abstract-skill";

@Component({
	tag: AbstractSkill.TAG,
})
export class SkillClient extends AbstractSkill {
	override equip(): void {
		Events.equip.fire(this.instance, true);
	}

	override unequip(): void {
		Events.equip.fire(this.instance, false);
	}

	override use(): void {
		print("using", this.instance.Name);
	}
}
