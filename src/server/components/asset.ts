import { BaseComponent, Component } from "@flamework/components";

interface AssetAttributes {
	assetId: number;
}

@Component({
	tag: "Asset",
	defaults: {
		assetId: -1,
	},
})
export class Asset extends BaseComponent<AssetAttributes> {
	private isBought = false;

	public buy(): void {
		if (this.isBought) return;

		this.isBought = true;
		print(`bought ${this.instance}`);
	}
}
