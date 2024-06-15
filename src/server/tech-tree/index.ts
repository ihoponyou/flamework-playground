import Object from "@rbxts/object-utils";
import { Tech, TechType } from "./tech";

export class TechTree {
	private techs = new Map<TechType, Tech>();

	constructor() {
		for (const techType of Object.values(TechType)) {
			this.techs.set(techType, new Tech(techType));
		}
		this.techs.get(TechType.WALLS)!.prerequisites.add(this.techs.get(TechType.CLAIM_DOOR)!);
	}

	public unlock(techType: TechType): boolean {
		const tech = this.techs.get(techType);
		if (!tech) {
			warn(`attempted to unlock tech ${techType} which does not exist`);
			return false;
		}
		return tech.unlock();
	}
}
