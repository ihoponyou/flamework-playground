import { Component, Components } from "@flamework/components";
import { OnStart } from "@flamework/core";
import { Players } from "@rbxts/services";
import { LOCAL_PLAYER } from "client/constants";
import { store } from "client/store";
import { AbstractCharacter } from "shared/components/abstract-character";
import { Equippable } from "shared/equippable";
import { ItemClient } from "./item-client";

@Component({
	tag: AbstractCharacter.TAG,
	predicate: (instance) => Players.GetPlayerFromCharacter(instance) === LOCAL_PLAYER,
})
export class CharacterClient extends AbstractCharacter implements OnStart {
	protected readonly inventory = this.instance.WaitForChild("Inventory") as Folder;
	protected readonly skills = this.instance.WaitForChild("Skills") as Folder;

	constructor(private components: Components) {
		super();
	}

	onStart(): void {
		for (const instance of this.inventory.GetChildren()) {
			this.retrieveEquippable(instance);
		}
		this.inventory.ChildAdded.Connect((child) => this.retrieveEquippable(child));

		for (const instance of this.skills.GetChildren()) {
			this.retrieveEquippable(instance);
		}
		this.skills.ChildAdded.Connect((child) => this.retrieveEquippable(child));
	}

	private retrieveEquippable(instance: Instance) {
		const equippable = this.components.waitForComponent<ItemClient>(instance).expect() as Equippable;
		store.addEquippable(instance.Name, equippable);
	}
}
