import { Component, Components } from "@flamework/components";
import { ConstructorRef } from "@flamework/components/out/utility";
import { OnStart } from "@flamework/core";
import { Players } from "@rbxts/services";
import { LOCAL_PLAYER } from "client/constants";
import { store } from "client/store";
import { AbstractCharacter } from "shared/components/abstract-character";
import { Equippable } from "shared/types/equippable";
import { ItemClient } from "./item-client";
import { SkillClient } from "./skill-client";

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
			this.retrieveEquippable(instance, ItemClient);
		}
		this.inventory.ChildAdded.Connect((child) => this.retrieveEquippable(child, ItemClient));

		for (const instance of this.skills.GetChildren()) {
			this.retrieveEquippable(instance, SkillClient);
		}
		this.skills.ChildAdded.Connect((child) => {
			this.retrieveEquippable(child, SkillClient);
		});
	}

	private retrieveEquippable<T extends Equippable>(instance: Instance, componentSpecifier: ConstructorRef<T>) {
		const equippable = this.components.waitForComponent(instance, componentSpecifier).expect();
		print(`got Equippable @ ${instance.Name}`);
		store.addEquippable(instance.Name, equippable);
	}
}
