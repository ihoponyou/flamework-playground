import { BaseComponent, Component } from "@flamework/components";

@Component()
export abstract class AbstractUseable extends BaseComponent {
	static readonly TAG = "Useable";
	abstract use(player: Player): void;
}
