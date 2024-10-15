import { BaseComponent, Component, Components } from "@flamework/components";
import { Dependency, OnStart } from "@flamework/core";
import { promiseR6 } from "@rbxts/promise-character";
import { ReplicatedStorage, ServerStorage } from "@rbxts/services";
import { ITEMS_SERVER } from "server/configs/items";
import { UsefulModel } from "shared/components/useful-model";
import { ItemId } from "shared/configs/items";
import { Equippable } from "shared/equippable";
import { CharacterServer } from "./character-server";
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
export class Item extends BaseComponent<ItemAttributes> implements OnStart, Equippable {
	static readonly TAG = "Item";

	static async createItem(quantity: number, name: string, parent?: Instance): Promise<Item> {
		const newItem = new Instance("Model");
		newItem.Parent = parent ?? ServerStorage;

		newItem.AddTag(Ownable.TAG);
		newItem.AddTag(Item.TAG);
		newItem.Name = name;

		return Dependency<Components>()
			.waitForComponent<Item>(newItem)
			.andThen((item) => {
				item.attributes.quantity = quantity;
				return item;
			});
	}

	public readonly config = ITEMS_SERVER[this.instance.Name as ItemId];

	private bodyAttach = this.newBodyAttach();
	private worldModel!: UsefulModel;

	constructor(private components: Components) {
		super();
	}

	onStart(): void {
		if (this.config === undefined) {
			error(`item config not found for ${this.instance.Name}`);
		}

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
	}

	equip(equipper: CharacterServer): void {
		this.weldTo(equipper.getHiltBone(), CFrame.identity);
	}

	unequip(unequipper: CharacterServer): void {
		const rig = promiseR6(unequipper.instance).expect();
		this.weldTo(rig[this.config.holsterLimb], CFrame.identity);
	}

	private weldTo(part: BasePart, offset?: CFrame): void {
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
