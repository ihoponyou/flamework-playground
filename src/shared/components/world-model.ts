import { BaseComponent, Component } from "@flamework/components";
import { OnStart } from "@flamework/core";
import { ReplicatedStorage } from "@rbxts/services";

@Component({
	tag: WorldModel.TAG,
})
export class WorldModel extends BaseComponent<{}, Model> implements OnStart {
	static readonly TAG = "WorldModel";

	// TODO: add this folder and some models
	private model = ReplicatedStorage.WorldModels.FindFirstChild(this.instance.Name, true);

	onStart(): void {
		if (this.model === undefined) {
			error(`world model does not exist for ${this.instance.Name}`);
		}
		this.model = this.model.Clone();
		this.model.Parent = this.instance;
	}
}
