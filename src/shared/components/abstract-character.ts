import { BaseComponent, Component } from "@flamework/components";
import { OnStart } from "@flamework/core";

// TODO: active/passive abilities

@Component()
export abstract class AbstractCharacter extends BaseComponent<{}, Model> implements OnStart {
	public static readonly TAG = "Character";

	protected humanoid!: Humanoid;
	protected animator!: Animator;

	onStart(): void {
		this.humanoid = this.instance.WaitForChild("Humanoid") as Humanoid;
		this.animator = this.instance.WaitForChild("Animator") as Animator;
	}

	public abstract lightAttack(): void;
	public abstract heavyAttack(): void;
	public abstract block(blockUp: boolean): void;
}
