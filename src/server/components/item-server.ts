import { BaseComponent, Component, Components } from "@flamework/components";
import { ReplicatedStorage } from "@rbxts/services";
import { WorldModel } from "shared/components/world-model";
import { EquippableServer } from "./equippable-server";

@Component({
	tag: ItemServer.TAG,
})
export class ItemServer extends BaseComponent {
	static readonly TAG = "Item";

	private worldModel!: WorldModel;
	private propWeld = new Instance("Weld");

	constructor(private components: Components, private equippable: EquippableServer) {
		super();
	}

	onStart(): void {
		const template = ReplicatedStorage.WorldModels.FindFirstChild(this.instance.Name);
		if (template === undefined) {
			error(`no model exists for "${this.instance.Name}"`);
		}
		const clone = template.Clone();
		clone.AddTag(WorldModel.TAG);
		this.worldModel = this.components.waitForComponent<WorldModel>(clone).expect();

		this.propWeld.Parent = this.worldModel.instance;

		this.equippable.onEquipChanged((isEquipped, equippedBy) => {
			if (isEquipped) {
				// weld to character HiltPart
				// play idle animation
				print(equippedBy, "equipped item");
			} else {
				// weld to character holster
				// stop idle animation
				print(equippedBy, "unequipped item");
			}
		});
	}

	weldTo(part: BasePart, offset?: CFrame): void {
		this.propWeld.Part0 = part;
		if (offset !== undefined) {
			this.propWeld.C0 = offset;
		}
	}
}
