import { BaseComponent, Component } from "@flamework/components";
import { OnStart } from "@flamework/core";

@Component({
	tag: UsefulModel.TAG,
})
export class UsefulModel extends BaseComponent<{}, Model> implements OnStart {
	static readonly TAG = "UsefulModel";

	private parts = new Array<BasePart>();
	private originalTransparencies = new Map<BasePart, number>();

	onStart(): void {
		print(`i, ${this.instance.GetFullName()}, am a useful model! ^_^`);

		for (const instance of this.instance.GetDescendants()) {
			if (!instance.IsA("BasePart")) continue;
			this.parts.push(instance);
			this.originalTransparencies.set(instance, instance.Transparency);
		}
	}

	hide(): void {
		for (const part of this.parts) {
			part.Transparency = 1;
		}
	}

	show(): void {
		for (const part of this.parts) {
			const originalTransparency = this.originalTransparencies.get(part);
			if (originalTransparency === undefined) {
				warn(`could not find original transparency for ${part.Name}`);
				continue;
			}
			part.Transparency = originalTransparency;
		}
	}
}
