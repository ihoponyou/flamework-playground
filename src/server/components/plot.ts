import { BaseComponent, Component, Components } from "@flamework/components";
import { Dependency, OnStart } from "@flamework/core";
import { Pad } from "./pad";
import { Asset } from "./asset";

export type PlotChild = Instance & {
	Parent: Instance;
};

@Component({
	tag: "Plot",
})
export class Plot extends BaseComponent implements OnStart {
	private pads = new Map<Instance, Pad>();
	private assets = new Map<Instance, Asset>();
	private components = Dependency<Components>();

	// private owner?: PlayerServer;

	public onStart(): void {
		this.instance.GetDescendants().forEach((value) => this.initDescendant(value));
	}

	private initDescendant(instance: Instance) {
		let component: Asset | Pad | undefined;
		component = this.components.getComponent<Pad>(instance);
		if (component !== undefined) {
			this.pads.set(instance, component as Pad);
			return;
		}
		component = this.components.getComponent<Asset>(instance);
		if (component !== undefined) this.assets.set(instance, component);
	}
}
