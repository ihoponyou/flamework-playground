import { BaseComponent, Component, Components } from "@flamework/components";
import { Dependency, OnStart } from "@flamework/core";
import { Pad } from "./pad";
import { Asset } from "./asset";

@Component({
	tag: "Plot",
})
export class Plot extends BaseComponent implements OnStart {
	private pads = new Map<number, Pad>();
	private assets = new Map<number, Asset>();
	private components = Dependency<Components>();

	// private owner?: PlayerServer;

	public onStart(): void {
		this.instance.GetDescendants().forEach((value) => this.initDescendant(value));
		for (const [id, pad] of this.pads) {
			const asset = this.assets.get(id);
			if (!asset) {
				warn(`pad with id: ${id} does not have a corresponding asset`);
				continue;
			}
			pad.setAsset(asset);
			pad.hide();
		}
		for (const [id, asset] of this.pads) {
			const pad = this.pads.get(id);
			if (pad) continue;
			warn(`asset with id: ${id} does not have a corresponding pad`);
		}
	}

	private initDescendant(instance: Instance) {
		let component: Asset | Pad | undefined;
		component = this.components.getComponent<Pad>(instance);
		if (component !== undefined) {
			if (this.pads.has(component.attributes.assetId)) {
				warn(`duplicate pad @ ${instance}`);
			}
			this.pads.set(component.attributes.assetId, component as Pad);
			return;
		}
		component = this.components.getComponent<Asset>(instance);
		if (!component) return;
		if (this.assets.has(component.attributes.assetId)) {
			warn(`duplicate asset @ ${instance}`);
		}
		this.assets.set(component.attributes.assetId, component);
	}
}
