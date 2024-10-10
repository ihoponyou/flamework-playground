import { Component } from "@flamework/components";
import { AbstractEquippable } from "./abstract-equippable";

@Component()
export abstract class AbstractSkill extends AbstractEquippable {
	static override readonly TAG = "Skill";
}
