import React, { useContext } from "@rbxts/react";
import { Equippable } from "shared/equippable";
import { controllerContext } from "./context/controllers";

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

// TODO: change with custom binds
const SLOT_LABELS = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "-", "="];

export function EquippableButton(props: Props) {
	const theme = THEMES[props.equippable.isEquipped() ? "equipped" : "unequipped"];
	const controllers = useContext(controllerContext);

	return (
		<textbutton
			AnchorPoint={new Vector2(0.5, 0)}
			AutoButtonColor={false}
			BackgroundColor3={theme.backgroundColor3}
			BorderSizePixel={0}
			Font={Enum.Font.Fantasy}
			FontFace={
				new Font("rbxasset://fonts/families/Balthazar.json", Enum.FontWeight.Regular, Enum.FontStyle.Normal)
			}
			Selectable={false}
			Size={UDim2.fromOffset(60, 60)}
			Text={props.equippableName}
			TextColor3={Color3.fromRGB(47, 43, 30)}
			TextSize={13}
			TextTransparency={theme.textTransparency}
			TextWrapped={true}
			Event={{
				MouseButton1Down: (rbx, x, y) => {
					const character = controllers.character.getCharacter();
					if (character === undefined) {
						warn("could not get character");
						return;
					}
					props.equippable.isEquipped()
						? props.equippable.unequip(character)
						: props.equippable.equip(character);
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
				Size={new UDim2(1, theme.sizeOffset, 1, theme.sizeOffset)}
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
