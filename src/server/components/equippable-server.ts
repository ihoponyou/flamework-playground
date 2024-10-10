import { Component } from "@flamework/components";
import Signal from "@rbxts/signal";
import { AbstractEquippable } from "shared/components/abstract-equippable";
import { CharacterServer } from "./character-server";
import { Ownable } from "./ownable";

type EquipChangedCallback = (isEquipped: boolean, character: CharacterServer) => void;

@Component({
	tag: AbstractEquippable.TAG,
})
export class EquippableServer extends AbstractEquippable {
	private equipChanged = new Signal<EquipChangedCallback>();

	constructor(private ownable: Ownable) {
		super();
	}

	equipTo(character: CharacterServer): boolean {
		if (!this.canBeEquippedBy(character)) return false;
		this.setIsEquipped(character, true);
		return true;
	}

	unequipFrom(character: CharacterServer): boolean {
		this.setIsEquipped(character, false);
		return true;
	}

	onEquipChanged(callback: EquipChangedCallback): RBXScriptConnection {
		return this.equipChanged.Connect((isEquipped, characterWhoEquipped) =>
			callback(isEquipped, characterWhoEquipped),
		);
	}

	private setIsEquipped(character: CharacterServer, equipping: boolean): void {
		if (!this.ownable.isOwnedBy(character)) {
			warn(
				`${character} tried to ${
					equipping ? "equip" : "unequip"
				} ${this.instance.GetFullName()} but does not own`,
			);
			return;
		}
		this._isEquipped = equipping;
		this.equipChanged.Fire(equipping, character);
	}
}
