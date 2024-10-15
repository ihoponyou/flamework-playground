import { BaseComponent, Component } from "@flamework/components";
import { OnStart } from "@flamework/core";
import { UsefulModel } from "shared/components/useful-model";
import { ItemId, ITEMS } from "shared/configs/items";
import { Equippable } from "shared/equippable";
import { AbstractCharacter } from "./abstract-character";

interface ItemAttributes {
	quantity: number;
}

@Component()
export abstract class AbstractItem extends BaseComponent<ItemAttributes> implements OnStart, Equippable {
	static readonly TAG = "Item";

	public readonly config = ITEMS[this.instance.Name as ItemId];

	protected abstract worldModel: UsefulModel;

	onStart(): void {
		if (this.config === undefined) {
			error(`item config not found for ${this.instance.Name}`);
		}
	}

	abstract equip(equipper: AbstractCharacter): void;

	abstract unequip(unequipper: AbstractCharacter): void;

	show(): void {
		this.worldModel.show();
	}

	hide(): void {
		this.worldModel.hide();
	}
}
