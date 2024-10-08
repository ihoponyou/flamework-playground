import { BaseComponent, Component } from "@flamework/components";

@Component()
export abstract class AbstractEquippable extends BaseComponent {
	static readonly TAG = "Equippable";

	protected _isEquipped = false;

	abstract equip(player: Player): void;
	abstract unequip(player: Player): void;

	isEquipped(): boolean {
		return this._isEquipped;
	}
}
