import { BaseComponent, Component } from "@flamework/components";
import { OnStart } from "@flamework/core";

@Component({
	tag: UsefulModel.TAG,
})
export class UsefulModel extends BaseComponent<{}, Model> implements OnStart {
	static readonly TAG = "UsefulModel";

	onStart(): void {
		print(`i, ${this.instance.GetFullName()}, am a useful model! ^_^`);
	}
}
