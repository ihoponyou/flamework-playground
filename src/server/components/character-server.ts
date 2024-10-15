import { Component, Components } from "@flamework/components";
import { OnStart } from "@flamework/core";
import { AbstractCharacter } from "shared/components/abstract-character";
import { ItemId } from "shared/configs/items";
import { SkillId } from "shared/skill-id";
import { ItemServer } from "./item-server";
import { SkillServer } from "./skill-server";

@Component({
	tag: AbstractCharacter.TAG,
})
export class CharacterServer extends AbstractCharacter implements OnStart {
	protected inventory = this.newFolder("Inventory");
	protected skills = this.newFolder("Skills");

	private hiltJoint = this.newHiltJoint();
	private hiltBone = this.newHiltBone();

	constructor(protected components: Components) {
		super();
	}

	onStart(): void {
		this.inventory.Parent = this.instance;
		this.skills.Parent = this.instance;
		this.hiltBone.Parent = this.instance;

		// should use promise rig for this
		const rightArm = this.instance.WaitForChild("Right Arm") as BasePart;

		this.hiltJoint.Parent = this.hiltBone;
		this.hiltJoint.Part0 = rightArm;
		this.hiltJoint.Part1 = this.hiltBone;
	}

	hasItem(itemName: string): boolean {
		return this.getItem(itemName) !== undefined;
	}

	getItem(itemName: string): ItemServer | undefined {
		const instance = this.inventory.FindFirstChild(itemName);
		if (instance === undefined) return undefined;
		const item = this.components.getComponent<ItemServer>(instance);
		return item;
	}

	getSkill(id: SkillId): SkillServer | undefined {
		const instance = this.skills.FindFirstChild(id);
		if (instance === undefined) return undefined;
		const skill = this.components.getComponent<SkillServer>(instance);
		return skill;
	}

	learnSkill(id: SkillId): void {
		SkillServer.instantiateSkill(id, this.skills);
	}

	giveItem(id: ItemId, quantity: number = 1): void {
		ItemServer.instantiateItem(id, quantity, this.inventory);
	}

	getHiltBone(): Part {
		return this.hiltBone;
	}

	private newFolder(name: string): Folder {
		const inventory = new Instance("Folder");
		inventory.Name = name;
		return inventory;
	}

	private newHiltJoint(): Motor6D {
		const joint = new Instance("Motor6D");
		joint.Name = "HiltJoint";
		joint.C0 = new CFrame(0, -1, 0);
		return joint;
	}

	private newHiltBone(): Part {
		const bone = new Instance("Part");
		bone.Name = "Hilt";
		bone.CanCollide = false;
		bone.CanTouch = false;
		bone.CanQuery = false;
		bone.Massless = true;
		bone.Transparency = 1;
		return bone;
	}
}
