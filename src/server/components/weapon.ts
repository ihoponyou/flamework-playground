import { BaseComponent, Component } from "@flamework/components";
import { WEAPONS } from "shared/configs/weapons";
import { Equippable } from "shared/modules/equippable";
import { WeaponType } from "shared/modules/weapon-type";
import { CharacterServer } from "./character-server";
import { ItemServer } from "./item-server";

@Component({
	tag: Weapon.TAG,
})
export class Weapon extends BaseComponent implements Equippable {
	static readonly TAG = "Weapon";

	private readonly config = WEAPONS[this.instance.Name];

	constructor(private item: ItemServer) {
		super();
	}

	equip(equipper: CharacterServer): void {
		this.item.equip(equipper);
	}

	unequip(unequipper: CharacterServer): void {
		this.item.unequip(unequipper);
	}

	onEquipChanged(callback: (isEquipped: boolean) => void): RBXScriptConnection {
		return this.item.onEquipChanged(callback);
	}

	isEquipped(): boolean {
		return this.item.isEquipped();
	}

	getEquipPriority(): number {
		return this.config.equipPriority;
	}

	getType(): WeaponType {
		return this.config.type;
	}
}
