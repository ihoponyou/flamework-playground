import { Component, Components } from "@flamework/components";
import { Dependency } from "@flamework/core";
import { promiseR6 } from "@rbxts/promise-character";
import { ReplicatedStorage, ServerStorage } from "@rbxts/services";
import { ITEMS_SERVER } from "server/configs/items";
import { Events } from "server/network";
import { AbstractItem } from "shared/components/abstract-item";
import { UsefulModel } from "shared/components/useful-model";
import { ItemId } from "shared/configs/items";
import { CharacterServer } from "./character-server";
import { Ownable } from "./ownable";

@Component({
	tag: AbstractItem.TAG,
	defaults: {
		quantity: -1,
		isEquipped: false,
	},
})
export class ItemServer extends AbstractItem {
	static async createItem(quantity: number, name: string, parent?: Instance): Promise<ItemServer> {
		const newItem = new Instance("Model");
		newItem.Parent = parent ?? ServerStorage;

		newItem.AddTag(Ownable.TAG);
		newItem.AddTag(ItemServer.TAG);
		newItem.Name = name;

		return Dependency<Components>()
			.waitForComponent<ItemServer>(newItem)
			.andThen((item) => {
				item.attributes.quantity = quantity;
				return item;
			});
	}

	public override readonly config = ITEMS_SERVER[this.instance.Name as ItemId];

	protected worldModel!: UsefulModel;
	private bodyAttach = this.newBodyAttach();

	constructor(private components: Components, private ownable: Ownable) {
		super();
	}

	override onStart(): void {
		super.onStart();

		const template = ReplicatedStorage.WorldModels.FindFirstChild(this.instance.Name);
		if (template === undefined) {
			error(`no world model exists for ${this.instance.Name}`);
		}
		const clone = template.Clone();
		clone.Parent = this.instance;
		clone.Name = `WorldModel`;
		clone.AddTag(UsefulModel.TAG);
		this.worldModel = this.components.waitForComponent<UsefulModel>(clone).expect();

		this.bodyAttach.Parent = this.worldModel.instance;
		this.bodyAttach.Part1 = this.worldModel.instance.PrimaryPart;

		Events.equip.connect((player, instance, shouldEquip) => {
			if (instance !== this.instance) return;
			const characterInstance = player.Character;
			if (characterInstance === undefined) return;
			const character = this.components.getComponent<CharacterServer>(characterInstance);
			if (character === undefined) return;
			if (shouldEquip) {
				this.equip(character);
			} else {
				this.unequip(character);
			}
		});
	}

	equip(equipper: CharacterServer): void {
		this.weldTo(equipper.getHiltBone(), this.config.equipC0);
		this.attributes.isEquipped = true;
	}

	unequip(unequipper: CharacterServer): void {
		const rig = promiseR6(unequipper.instance).expect();
		this.weldTo(rig[this.config.holsterPart], this.config.holsterC0);
		this.attributes.isEquipped = false;
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
