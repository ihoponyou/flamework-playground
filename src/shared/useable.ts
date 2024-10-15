import { AbstractCharacter } from "./components/abstract-character";

export interface Useable {
	use(user: AbstractCharacter): void;
}
