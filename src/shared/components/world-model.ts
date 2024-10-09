import { BaseComponent, Component } from "@flamework/components";

@Component({
	tag: WorldModel.TAG,
})
export class WorldModel extends BaseComponent<{}, Model> {
	static readonly TAG = "WorldModel";
}
