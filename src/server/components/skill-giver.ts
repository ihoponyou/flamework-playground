import { BaseComponent, Component } from "@flamework/components";
import { OnStart } from "@flamework/core";
import { store } from "server/store";
import { SkillId } from "shared/modules/skill-id";

@Component({
	tag: "SkillGiver",
})
export class SkillGiver extends BaseComponent<{}, BasePart> implements OnStart {
	private clickDetector = new Instance("ClickDetector");

	onStart(): void {
		this.clickDetector.Parent = this.instance;
		this.clickDetector.MouseClick.Connect((player) => this.onClick(player));
	}

	private onClick(playerWhoClicked: Player): void {
		store.addSkill(playerWhoClicked, SkillId.GOBLET_THROW);
		store.addSkill(playerWhoClicked, SkillId.POMMEL_STRIKE);
	}
}
