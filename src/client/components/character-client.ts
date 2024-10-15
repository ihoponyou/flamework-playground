import { Component } from "@flamework/components";
import { Players } from "@rbxts/services";
import { LOCAL_PLAYER } from "client/constants";
import { AbstractCharacter } from "shared/components/abstract-character";

@Component({
	tag: AbstractCharacter.TAG,
	predicate: (instance) => Players.GetPlayerFromCharacter(instance) === LOCAL_PLAYER,
})
export class CharacterClient extends AbstractCharacter {
	protected inventory = this.instance.WaitForChild("Inventory") as Folder;
}
