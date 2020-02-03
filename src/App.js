import React, { useState } from "react";
import { Global, css } from "@emotion/core";
import styled from "@emotion/styled";
import colorize from "tinycolor2";

function App() {
	const [bgLightness, setBgLightness] = useState(0);
	const [hue, setHue] = useState(0);
	const [squareCount, setSquareCount] = useState(1);
	const [saturation, setSaturation] = useState(0);
	const [strength, setStrength] = useState(0.3);
	const [ratio, setRatio] = useState(1);

	const colorBg = `hsl(${hue}, ${saturation}%, ${bgLightness}%)`;
	const isDark = colorize(colorBg).isDark();

	const computedLightness = isDark ? 100 : 0;
	const colorText = isDark ? "white" : "black";

	const shapeSize = 200;
	const shapeHeight = ratio * shapeSize;
	const shadowOpacity = isDark ? 1 : 0.5;

	const globalStyles = `
		:root {
			--colorBgL: ${bgLightness};
			--colorBg: ${colorBg};
			--colorH: ${hue};
			--colorS: ${saturation}%;
			--colorL: ${computedLightness}%;
			--colorStr: ${strength};
			--colorText: ${colorText};
			--shapeWidth: ${shapeSize}px;
			--shapeHeight: ${shapeHeight}px;
			--shadowOpacity: ${shadowOpacity};
		}
		html {
			background: var(--colorBg);
			color: var(--colorText);
		}
		body {
			background: var(--colorBg);
		}
	`;

	const createOnChange = fn => event => fn(parseFloat(event.target.value));
	const handleOnChangeLightness = createOnChange(setBgLightness);
	const handleOnChangeStrength = createOnChange(setStrength);
	const handleOnChangeRatio = createOnChange(setRatio);
	const handleOnChangeSquares = createOnChange(setSquareCount);
	const handleOnChangeHue = createOnChange(setHue);
	const handleOnChangeSaturation = createOnChange(setSaturation);

	const squares = [...Array(squareCount)].map((_, index) => index);

	return (
		<Layout>
			<Global styles={globalStyles} />
			<Controls>
				<Logo>
					SHADOW<span>X</span>LIGHT
				</Logo>
				<Control
					label="Shapes"
					min="1"
					max="4"
					onChange={handleOnChangeSquares}
					value={squareCount}
					step="1"
				/>
				<Control
					label="Size"
					min="0.25"
					max="3"
					onChange={handleOnChangeRatio}
					value={ratio}
					step="0.25"
				/>
				<Control
					label="Lightness"
					min="0"
					max="100"
					onChange={handleOnChangeLightness}
					value={bgLightness}
					step="10"
				/>
				<Control
					label="Strength"
					min="0.1"
					max="0.5"
					onChange={handleOnChangeStrength}
					value={strength}
					step="0.1"
				/>
				<Control
					label="Saturation"
					min="0"
					max="100"
					onChange={handleOnChangeSaturation}
					value={saturation}
					step="1"
				/>
				<Control
					label="Hue"
					min="0"
					max="360"
					onChange={handleOnChangeHue}
					value={hue}
					step="1"
				/>

				<br />
				<LabelText>
					Made by <a href="https://jonquach.com">Q</a>
				</LabelText>
			</Controls>
			{squares.map(index => (
				<Shape key={index} />
			))}
		</Layout>
	);
}

function Control({ label, ...props }) {
	return (
		<Label>
			<LabelText>{label}</LabelText>
			<input type="range" {...props} />
		</Label>
	);
}

function Shape() {
	return (
		<SquareWrapper>
			<Highlight />
			<Square />
			<Shadow />
		</SquareWrapper>
	);
}

const Layout = styled.div`
	align-items: center;
	display: flex;
	height: 100vh;
	justify-content: center;
	position: relative;
	width: 100%;
`;

const Logo = styled.div`
	font-size: 12px;
	font-weight: 900;
	margin-bottom: 20px;

	span {
		font-weight: 100;
		opacity: 0.2;
		padding: 0 3px;
	}
`;

const Label = styled.label`
	display: block;
	margin: 0 0 10px;
`;

const LabelText = styled.div`
	margin: 0 0 2px;
	font-size: 9px;
	text-transform: uppercase;
	font-weight: bold;
	opacity: 0.3;

	a {
		text-decoration: none;
		color: currentColor;
	}
`;

const SquareWrapper = styled.div`
	position: relative;
`;

const shadow = () => {
	const h = "var(--colorH)";
	const s = "var(--colorS)";
	const l = "var(--colorL)";
	const str = "var(--colorStr)";

	return css`
		box-shadow: 0 2px 4px hsla(${h}, ${s}, ${l}, ${str}),
			0 5px 10px -5px hsla(${h}, ${s}, ${l}, ${str}),
			0 10px 30px -20px hsla(${h}, ${s}, ${l}, ${str}),
			0 30px 60px -10px hsla(${h}, ${s}, ${l}, ${str});
		opacity: var(--shadowOpacity);
	`;
};

const Square = styled.div`
	background-color: var(--colorBg, white);
	width: var(--shapeWidth);
	height: var(--shapeHeight);
	position: relative;
	margin: 0.5px;
	max-height: 80vh;
	z-index: 10;
`;

const Highlight = styled.div`
	box-shadow: 0 2px 4px -3px white inset;
	bottom: 0;
	left: 0;
	position: absolute;
	right: 0;
	top: 0;
	opacity: 0.2;
	z-index: 11;
`;

const Shadow = styled.div`
	bottom: 0;
	left: 0;
	position: absolute;
	right: 0;
	top: 0;
	${shadow};
`;

const Controls = styled.div`
	position: absolute;
	top: 20px;
	left: 20px;
	z-index: 20;
	user-select: none;
`;

export default App;
