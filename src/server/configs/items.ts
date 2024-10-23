import { Weapon } from "server/components/weapon";
import { ItemConfig, ITEMS } from "shared/configs/items";
import { ItemId } from "shared/modules/item-id";

export interface ItemConfigServer extends ItemConfig {
	readonly tags: ReadonlyArray<string>;
}

export const ITEMS_SERVER: Record<ItemId, ItemConfigServer> = {
	Goblet: {
		...ITEMS.Goblet,
		tags: [],
	},
	"Bronze Sword": {
		...ITEMS["Bronze Sword"],
		tags: [Weapon.TAG],
	},
};
