import { Component, Components } from "@flamework/components";
import { Modding, OnStart } from "@flamework/core";
import { SKILLS } from "server/configs/skills";
import { Events } from "server/network";
import { AbstractSkill } from "shared/components/abstract-skill";
import { SkillId } from "shared/types/skill-id";
import { CharacterServer } from "./character-server";
import { OwnableServer } from "./ownable-server";
import { Weapon } from "./weapon";

@Component({
	tag: AbstractSkill.TAG,
	defaults: {
		isEquipped: false,
	},
})
export class SkillServer extends AbstractSkill implements OnStart {
	static async instantiate(name: SkillId, parent?: Instance, owner?: Player): Promise<SkillServer> {
		const skillInstance = new Instance("Tool");
		skillInstance.Parent = script;

		skillInstance.AddTag(OwnableServer.TAG);
		skillInstance.AddTag(this.TAG);
		skillInstance.Name = name;

		return Modding.resolveSingleton(Components)
			.waitForComponent<SkillServer>(skillInstance)
			.andThen((newSkill) => {
				skillInstance.Parent = parent ?? script;
				newSkill.getOwnable().setOwner(owner);
				return newSkill;
			});
	}

	public readonly config = SKILLS[this.instance.Name as SkillId];

	private equippedWeapon?: Weapon;

	constructor(private components: Components, protected ownable: OwnableServer) {
		super();
	}

	onStart(): void {
		if (this.config === undefined) {
			error(`skill config not found for ${this.instance.Name}`);
		}

		Events.equip.connect((player, instance, shouldEquip) => {
			if (instance !== this.instance) return;
			const characterInstance = player.Character;
			if (characterInstance === undefined) return;
			const character = this.components.getComponent<CharacterServer>(characterInstance);
			if (character === undefined) return;
			if (shouldEquip) {
				this.equip(character);
			} else {
				this.unequip(character);
			}
		});

		Events.use.connect((player, instance) => {
			if (instance !== instance) return;
			// if (!this.ownable.isOwnedBy(player)) return;
			const characterInstance = player.Character;
			if (characterInstance === undefined) return;
			const character = this.components.getComponent<CharacterServer>(characterInstance);
			if (character === undefined) return;
			this.use(character);
		});
	}

	override equip(equipper: CharacterServer): void {
		if (this.config.requiredWeaponType !== undefined) {
			const requiredWeapon = equipper.getWeaponOfType(this.config.requiredWeaponType);
			if (requiredWeapon === undefined) return;
			requiredWeapon.equip(equipper);
			this.equippedWeapon = requiredWeapon;
		}

		this.attributes.isEquipped = true;
	}

	override unequip(unequipper: CharacterServer): void {
		this.equippedWeapon?.unequip(unequipper);

		this.attributes.isEquipped = false;
	}

	override use(user: CharacterServer): void {
		if (!this.isEquipped()) return;
		print("BOOM!", this.instance.Name);
	}

	getOwnable(): OwnableServer {
		return this.ownable;
	}
}
