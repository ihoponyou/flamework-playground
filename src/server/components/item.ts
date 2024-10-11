import { BaseComponent, Component, Components } from "@flamework/components";
import { Dependency, OnStart } from "@flamework/core";
import { ReplicatedStorage, ServerStorage } from "@rbxts/services";
import { UsefulModel } from "shared/components/useful-model";
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
export class Item extends BaseComponent<ItemAttributes> implements OnStart {
	static readonly TAG = "Item";

	static async createItem(quantity: number, name: string, parent?: Instance): Promise<Item> {
		const newItem = new Instance("Model");
		newItem.Parent = parent ?? ServerStorage;

		newItem.AddTag(Ownable.TAG);
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

	private bodyAttach = this.newBodyAttach();
	private worldModel!: UsefulModel;

	constructor(private components: Components, private equippable: EquippableServer) {
		super();
	}

	onStart(): void {
		const template = ReplicatedStorage.WorldModels.FindFirstChild(this.instance.Name);
		if (template === undefined) {
			error(`no world model exists for ${this.instance.Name}`);
		}
		const clone = template.Clone();
		clone.Parent = this.instance;
		clone.Name = `WorldModel(${this.instance.Name})`;
		clone.AddTag(UsefulModel.TAG);
		this.worldModel = this.components.waitForComponent<UsefulModel>(clone).expect();

		this.bodyAttach.Parent = this.worldModel.instance;
		this.bodyAttach.Part1 = this.worldModel.instance.PrimaryPart;

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
		this.bodyAttach.Part0 = part;
		if (offset !== undefined) {
			this.bodyAttach.C0 = offset;
		}
	}

	private newBodyAttach(): Weld {
		const weld = new Instance("Weld");
		weld.Name = "BodyAttach";
		return weld;
	}
}
