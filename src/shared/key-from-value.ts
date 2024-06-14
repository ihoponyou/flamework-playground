import Object from "@rbxts/object-utils";

export function keyFromValue<T extends object>(object: T, value: T[keyof T]): keyof T | undefined {
	return Object.keys(object)[(Object.values(object) as defined[]).indexOf(value as defined)] as keyof T | undefined;
}
