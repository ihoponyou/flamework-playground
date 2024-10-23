import { Component, Components } from "@flamework/components";
import { OnStart } from "@flamework/core";
import { AbstractCharacter } from "shared/components/abstract-character";
import { Equippable } from "shared/modules/equippable";
import { ItemId } from "shared/modules/item-id";
import { SkillId } from "shared/modules/skill-id";
import { WeaponType } from "shared/modules/weapon-type";
import { ItemServer } from "./item-server";
import { SkillServer } from "./skill-server";
import { Weapon } from "./weapon";

@Component({
	tag: AbstractCharacter.TAG,
})
export class CharacterServer extends AbstractCharacter implements OnStart {
	protected inventory = this.newFolder("Inventory");
	protected skills = this.newFolder("Skills");

	private hiltJoint = this.newHiltJoint();
	private hiltBone = this.newHiltBone();
	private weapons: Record<WeaponType, Weapon | undefined> = {
		[WeaponType.FIST]: undefined,
		[WeaponType.DAGGER]: undefined,
		[WeaponType.SPEAR]: undefined,
		[WeaponType.SWORD]: undefined,
	};

	private currentlyEquipped?: Equippable;

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

	getHiltBone(): Part {
		return this.hiltBone;
	}

	getWeaponOfType(weaponType: WeaponType): Weapon | undefined {
		return this.weapons[weaponType];
	}

	learnSkill(id: SkillId): void {
		SkillServer.instantiate(id, this.skills, this);
	}

	giveItem(id: ItemId, quantity: number = 1): void {
		ItemServer.instantiate(id, quantity, this.inventory, this).andThen((item) => {
			// holster
			item.unequip(this);

			if (!item.instance.HasTag(Weapon.TAG)) return;
			this.components.waitForComponent<Weapon>(item.instance).andThen((weapon) => this.cacheWeapon(weapon));
		});
	}

	getCurrentEquipped(): Equippable | undefined {
		return this.currentlyEquipped;
	}

	setCurrentEquipped(equippable?: Equippable): void {
		this.currentlyEquipped = equippable;
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

	// what if the character drops the highest tier weapon
	private cacheWeapon(weapon: Weapon) {
		const weaponType = weapon.config.type;
		const currentWeaponOfType = this.weapons[weaponType];
		if (
			currentWeaponOfType === undefined ||
			currentWeaponOfType.config.equipPriority < weapon.config.equipPriority
		) {
			this.weapons[weaponType] = weapon;
		}
	}
}
