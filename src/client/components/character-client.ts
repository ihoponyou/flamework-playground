import { Component } from "@flamework/components";
import { Players } from "@rbxts/services";
import { LOCAL_PLAYER } from "client/constants";
import { AbstractCharacter } from "shared/components/abstract-character";
import { EquippableClient } from "./equippable-client";

@Component({
	tag: AbstractCharacter.TAG,
	predicate: (instance) => Players.GetPlayerFromCharacter(instance) === LOCAL_PLAYER,
})
export class CharacterClient extends AbstractCharacter {
	protected inventory = this.instance.WaitForChild("Inventory") as Folder;

	override equip(equippable: EquippableClient): void {
		equippable.equipTo();
	}

	override unequip(equippable: EquippableClient): void {
		equippable.unequipFrom();
	}
}
