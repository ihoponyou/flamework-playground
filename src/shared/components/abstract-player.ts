import { BaseComponent, Component } from "@flamework/components";

@Component()
export abstract class AbstractPlayer extends BaseComponent<{}, Player> {
	protected abstract inventory: Folder;
}
