import Object from "@rbxts/object-utils";

export enum TechType {
	CLAIM_DOOR,
}

export class Tech {
	private _isUnlocked = false;
	private prerequisites = new Array<Tech>();

	constructor(private techType: TechType, isUnlocked = false, prerequisites = new Array<Tech>()) {
		this._isUnlocked = isUnlocked;
	}

	public isUnlocked(): boolean {
		return this._isUnlocked;
	}

	public unlock(): boolean {
		if (this._isUnlocked) return false;
		for (const tech of this.prerequisites) {
			if (!tech.isUnlocked()) return false;
		}
		print(`unlocked ${Object.keys(TechType)[Object.values(TechType).indexOf(this.techType)]}`);
		this._isUnlocked = true;
		return true;
	}
}
