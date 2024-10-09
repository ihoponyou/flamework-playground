import { BaseComponent, Component, Components } from "@flamework/components";
import { OnStart } from "@flamework/core";
import { ReplicatedStorage } from "@rbxts/services";
import { AbstractEquippable } from "./abstract-equippable";
import { WorldModel } from "./world-model";

@Component()
export abstract class AbstractItem extends BaseComponent implements OnStart {
	static readonly TAG = "Item";

	protected abstract equippable: AbstractEquippable;
	protected worldModel!: WorldModel;

	constructor(protected components: Components) {
		super();
	}

	onStart(): void {
		const template = ReplicatedStorage.WorldModels.FindFirstChild(this.instance.Name);
		if (template === undefined) {
			error(`no model exists for "${this.instance.Name}"`);
		}
		const clone = template.Clone();
		clone.AddTag(WorldModel.TAG);
		this.worldModel = this.components.waitForComponent<WorldModel>(clone).expect();
	}
}
