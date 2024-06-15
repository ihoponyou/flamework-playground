import { BaseComponent, Component, Components } from "@flamework/components";
import { Dependency, OnStart } from "@flamework/core";
import { Players } from "@rbxts/services";
import { PlayerServer } from "./player-server";
import { keyFromValue } from "shared/key-from-value";
import { TechType } from "server/tech-tree/tech";
import { Asset } from "./asset";
import { Plot, PlotChild } from "./plot";

interface PadAttributes {
	assetId: number;
}

type PadInstance = BasePart & PlotChild;

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

	public onStart(): void {
		const plot = this.components.getComponent<Plot>(this.instance.Parent);
		if (!plot) error("parent is not a Plot or is missing Plot component");
		this.plot = plot;

		if (!keyFromValue(TechType, this.attributes.assetId)) {
			warn(`${this.instance} assigned to buy asset ${this.attributes.assetId} which does not exist`);
		}

		this.instance.Touched.Connect((part) => {
			const parent = part.Parent;
			if (!parent) return;
			const player = Players.GetPlayerFromCharacter(parent);
			if (!player) return;
			const playerComponent = this.components.getComponent<PlayerServer>(player);
			if (!playerComponent?.unlockTech(this.attributes.assetId)) return;

			this.instance.CanCollide = false;
			this.instance.Transparency = 1;
		});
	}
}
