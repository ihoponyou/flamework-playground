import { keyFromValue } from "shared/key-from-value";

export enum TechType {
	CLAIM_DOOR,
	WALLS,
}

export class Tech {
	private _isUnlocked = false;
	public readonly prerequisites = new Set<Tech>();

	constructor(private techType: TechType, isUnlocked = false, prerequisites = new Set<Tech>()) {
		this._isUnlocked = isUnlocked;
		this.prerequisites = prerequisites;
	}

	public isUnlocked(): boolean {
		return this._isUnlocked;
	}

	public unlock(): boolean {
		if (this._isUnlocked) return false;
		for (const tech of this.prerequisites) {
			if (!tech.isUnlocked()) return false;
		}
		print(`unlocked ${keyFromValue(TechType, this.techType)}`);
		this._isUnlocked = true;
		return true;
	}
}
