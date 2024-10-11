import { BaseComponent, Component, Components } from "@flamework/components";
import { Dependency } from "@flamework/core";
import { ServerStorage } from "@rbxts/services";
import { WorldModel } from "shared/components/world-model";
import { EquippableServer } from "./equippable-server";
import { Ownable } from "./ownable";

interface ItemAttributes {
	quantity: number;
}

@Component({
	tag: Item.TAG,
	defaults: {
		quantity: -1,
	},
})
export class Item extends BaseComponent<ItemAttributes> {
	static readonly TAG = "Item";

	static async createItem(quantity: number, name: string, parent?: Instance): Promise<Item> {
		const newItem = new Instance("Model");
		newItem.Parent = parent ?? ServerStorage;

		newItem.AddTag(Ownable.TAG);
		newItem.AddTag(WorldModel.TAG);
		newItem.AddTag(EquippableServer.TAG);
		newItem.AddTag(Item.TAG);
		newItem.Name = name;

		return Dependency<Components>()
			.waitForComponent<Item>(newItem)
			.andThen((item) => {
				item.attributes.quantity = quantity;
				return item;
			});
	}

	private propWeld = new Instance("Weld");

	constructor(private components: Components, private equippable: EquippableServer, private worldModel: WorldModel) {
		super();
	}

	onStart(): void {
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
