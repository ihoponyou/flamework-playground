import React from "@rbxts/react";
import { Equippable } from "shared/equippable";

interface Props {
	equippable: Equippable;
	equippableName: string;
	quantity?: number;
	slot?: number;
}

const SIZE = UDim2.fromOffset(60, 60);

// TODO: change with custom binds
const SLOT_LABELS = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "-", "="];

export function EquippableButton(props: Props) {
	return (
		<textbutton
			AnchorPoint={new Vector2(0.5, 0)}
			// AutoButtonColor={false}
			// BackgroundColor3={color}
			BorderSizePixel={0}
			Font={Enum.Font.Fantasy}
			FontFace={
				new Font("rbxasset://fonts/families/Balthazar.json", Enum.FontWeight.Regular, Enum.FontStyle.Normal)
			}
			Selectable={false}
			Size={SIZE}
			Text={props.equippableName}
			TextColor3={Color3.fromRGB(47, 43, 30)}
			TextSize={13}
			// TextTransparency={textTransparency}
			TextWrapped={true}
		>
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
