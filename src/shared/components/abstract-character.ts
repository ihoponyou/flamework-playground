import { BaseComponent, Component } from "@flamework/components";

type CharacterInstance = Model;

@Component()
export abstract class AbstractCharacter extends BaseComponent<{}, CharacterInstance> {
	static readonly TAG = "Character";

	static addTags(instance: CharacterInstance): void {
		instance.AddTag(this.TAG);
	}

	protected abstract inventory: Folder;
}
