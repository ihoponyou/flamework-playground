import { BaseComponent, Component, Components } from "@flamework/components";
import { Dependency, OnStart } from "@flamework/core";
import { Players } from "@rbxts/services";
import { PlayerServer } from "./player-server";
import { keyFromValue } from "shared/key-from-value";
import { TechType } from "server/tech-tree/tech";
import { Asset } from "./asset";
import { Plot } from "./plot";
import { ModelServer } from "./model";

interface PadAttributes {
	assetId: number;
}

type PadInstance = Model & {
	Part: Part & { BillboardGui: BillboardGui };
};

@Component({
	tag: "Pad",
	defaults: {
		assetId: -1,
	},
})
export class Pad extends BaseComponent<PadAttributes, PadInstance> implements OnStart {
	private components = Dependency<Components>();
	private plot!: Plot;
	private asset?: Asset;
	private touchedConnection?: RBXScriptConnection;

	constructor(public readonly model: ModelServer) {
		super();
	}

	public onStart(): void {
		const parent = this.instance.Parent;
		if (!parent) error("pad is not parented to a Plot");
		const plot = this.components.getComponent<Plot>(parent);
		if (!plot) error("parent is not a Plot or is missing Plot component");
		this.plot = plot;

		this.touchedConnection = this.instance.Part.Touched.Connect((part) => this.onTouched(part));
	}

	private onTouched(otherPart: BasePart): void {
		const parent = otherPart.Parent;
		if (!parent) return;
		const player = Players.GetPlayerFromCharacter(parent);
		if (!player) return;

		if (!this.asset) {
			error("where the asset at");
		}

		this.asset.buy();

		this.model.hide();

		this.touchedConnection?.Disconnect();
	}

	public setAsset(asset: Asset): void {
		this.asset = asset;
	}

	public hide(): void {
		this.model.hide();
		this.instance.Part.BillboardGui.Enabled = false;
	}

	public show(): void {
		this.model.show();
		this.instance.Part.BillboardGui.Enabled = true;
	}
}
