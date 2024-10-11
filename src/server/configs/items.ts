import { CharacterServer } from "server/components/character-server";
import { ItemConfig, ItemId, ITEMS } from "shared/configs/items";

export interface ItemConfigServer extends ItemConfig {
	someServerSpecificProperty: (character: CharacterServer) => void;
}

export const ITEMS_SERVER: Record<ItemId, ItemConfigServer> = {
	Goblet: {
		...ITEMS.Goblet,
		someServerSpecificProperty: () => true,
	},
	"Bronze Sword": {
		...ITEMS["Bronze Sword"],
		someServerSpecificProperty: () => false,
	},
};