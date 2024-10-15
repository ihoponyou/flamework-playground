import React from "@rbxts/react";

export function Backpack() {
	return (
		<scrollingframe
			Active={true}
			AnchorPoint={new Vector2(0.5, 1)}
			BackgroundColor3={Color3.fromRGB(0, 0, 0)}
			BackgroundTransparency={0.8}
			BorderSizePixel={0}
			Position={new UDim2(0.5, 0, 1, -80)}
			ScrollBarImageColor3={Color3.fromRGB(0, 0, 0)}
			ScrollingDirection={Enum.ScrollingDirection.Y}
			Size={new UDim2(0.5, 0, 0.5, 100)}
		></scrollingframe>
	);
}
