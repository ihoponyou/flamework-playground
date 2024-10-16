import { useMotion } from "@rbxts/pretty-react-hooks";
import React, { useContext, useState } from "@rbxts/react";
import { Equippable } from "shared/types/equippable";
import { controllerContext } from "../context/controller";

interface Props {
	equippable: Equippable;
	equippableName: string;
	quantity?: number;
	slot?: number;
}

interface ButtonTheme {
	backgroundColor3: Color3;
	sizeOffset: number;
	textTransparency: number;
}

const THEMES: Record<"equipped" | "unequipped", ButtonTheme> = {
	equipped: {
		backgroundColor3: Color3.fromRGB(255, 248, 238),
		sizeOffset: 10,
		textTransparency: 0,
	},
	unequipped: {
		backgroundColor3: Color3.fromRGB(215, 203, 191),
		sizeOffset: 6,
		textTransparency: 0.2,
	},
};

const TWEEN_OPTIONS: Ripple.TweenOptions = {
	time: 0.1,
};

// TODO: change with custom binds
const SLOT_LABELS = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "-", "="];

export function EquippableButton(props: Props) {
	const controllers = useContext(controllerContext);

	const [isEquipped, setIsEquipped] = useState(false);

	const theme = THEMES[isEquipped ? "equipped" : "unequipped"];

	const [backgroundColor, backgroundColorMotion] = useMotion(THEMES.unequipped.backgroundColor3);
	const [sizeOffset, sizeOffsetMotion] = useMotion(THEMES.unequipped.sizeOffset);
	const [textTransparency, textTransparencyMotion] = useMotion(THEMES.unequipped.textTransparency);

	backgroundColorMotion.tween(theme.backgroundColor3, TWEEN_OPTIONS);
	sizeOffsetMotion.tween(theme.sizeOffset, {
		...TWEEN_OPTIONS,
		style: isEquipped ? Enum.EasingStyle.Back : undefined,
	});
	textTransparencyMotion.tween(theme.textTransparency, TWEEN_OPTIONS);

	return (
		<textbutton
			AnchorPoint={new Vector2(0.5, 0)}
			AutoButtonColor={false}
			BackgroundColor3={backgroundColor}
			BorderSizePixel={0}
			Font={Enum.Font.Fantasy}
			FontFace={
				new Font("rbxasset://fonts/families/Balthazar.json", Enum.FontWeight.Regular, Enum.FontStyle.Normal)
			}
			LayoutOrder={props.slot ?? -1}
			Selectable={false}
			Size={UDim2.fromOffset(60, 60)}
			Text={props.equippableName}
			TextColor3={Color3.fromRGB(47, 43, 30)}
			TextSize={13}
			TextTransparency={textTransparency}
			TextWrapped={true}
			Event={{
				MouseButton1Down: (rbx, x, y) => {
					const character = controllers.character.getCharacter();
					if (character === undefined) {
						warn("undefined character");
						return;
					}
					if (props.equippable.isEquipped()) {
						props.equippable.unequip(character);
						if (props.equippable.isEquipped()) return; // TODO: this is jank af
						setIsEquipped(false);
					} else {
						props.equippable.equip(character);
						if (!props.equippable.isEquipped()) return;
						setIsEquipped(true);
					}
				},
			}}
		>
			<imagelabel
				key="Overlay"
				AnchorPoint={new Vector2(0.5, 0.5)}
				BackgroundTransparency={1}
				Image="rbxassetid://3419850962"
				ImageColor3={Color3.fromRGB(245, 197, 130)}
				Position={new UDim2(0.5, 0, 0.5, 0)}
				ScaleType={Enum.ScaleType.Slice}
				Size={sizeOffset.map((value) => new UDim2(1, value, 1, value))}
				SliceCenter={new Rect(13, 13, 13, 13)}
			/>
			<textlabel
				key="Slot"
				AnchorPoint={new Vector2(0.5, 0.5)}
				BackgroundColor3={Color3.fromRGB(255, 221, 162)}
				BorderSizePixel={0}
				Font={Enum.Font.SourceSansBold}
				FontFace={
					new Font(
						"rbxasset://fonts/families/SourceSansPro.json",
						Enum.FontWeight.Bold,
						Enum.FontStyle.Normal,
					)
				}
				Position={new UDim2(0.5, 0, 0, 0)}
				Size={new UDim2(0, 16, 0, 12)}
				Text={props.slot !== undefined ? SLOT_LABELS[props.slot] : "oops"}
				TextColor3={Color3.fromRGB(47, 44, 38)}
				TextSize={14}
				TextYAlignment={Enum.TextYAlignment.Bottom}
				ZIndex={2}
				Visible={props.slot !== undefined}
			>
				<imagelabel
					BackgroundTransparency={1}
					Image="rbxassetid://3419937808"
					Position={new UDim2(0, -1, 0, -1)}
					ScaleType={Enum.ScaleType.Slice}
					Size={new UDim2(1, 2, 1, 3)}
					SliceCenter={new Rect(2, 2, 2, 2)}
					ZIndex={2}
				/>
			</textlabel>
			<textlabel
				key="Quantity"
				AnchorPoint={new Vector2(0.5, 0.5)}
				BackgroundColor3={Color3.fromRGB(255, 221, 162)}
				BorderSizePixel={0}
				Font={Enum.Font.SourceSans}
				FontFace={
					new Font(
						"rbxasset://fonts/families/SourceSansPro.json",
						Enum.FontWeight.Regular,
						Enum.FontStyle.Normal,
					)
				}
				Position={new UDim2(0.5, 0, 1, 0)}
				Size={new UDim2(0, 20, 0, 12)}
				Text={`x${props.quantity}`}
				TextColor3={Color3.fromRGB(47, 44, 38)}
				TextSize={14}
				TextYAlignment={Enum.TextYAlignment.Bottom}
				Visible={props.quantity !== undefined && props.quantity > 1}
				ZIndex={2}
			>
				<imagelabel
					BackgroundTransparency={1}
					Image="rbxassetid://3419937808"
					Position={new UDim2(0, -1, 0, -1)}
					ScaleType={Enum.ScaleType.Slice}
					Size={new UDim2(1, 2, 1, 3)}
					SliceCenter={new Rect(2, 2, 2, 2)}
					ZIndex={2}
				/>
			</textlabel>
		</textbutton>
	);
}
