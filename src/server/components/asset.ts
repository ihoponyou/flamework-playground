import { BaseComponent, Component } from "@flamework/components";
import { OnStart } from "@flamework/core";
import { ModelServer } from "./model";

interface AssetAttributes {
	assetId: number;
}

type AssetInstance = Model;

@Component({
	tag: "Asset",
})
export class Asset extends BaseComponent<AssetAttributes, AssetInstance> implements OnStart {
	private _isBought = false;

	constructor(private model: ModelServer) {
		super();
	}

	public onStart(): void {
		this.model.hide();
	}

	public buy(): void {
		if (this._isBought) return;

		this._isBought = true;
		this.model.show();
		print(`bought ${this.instance}`);
	}

	public isBought(): boolean {
		return this._isBought;
	}
}
