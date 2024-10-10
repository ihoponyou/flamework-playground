import { BaseComponent, Component } from "@flamework/components";
import { AbstractCharacter } from "./abstract-character";

@Component()
export abstract class AbstractUseable extends BaseComponent {
	static readonly TAG = "Useable";
	abstract use(character: AbstractCharacter): void;
}
