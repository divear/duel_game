import React, { useEffect, useRef, useState } from "react";
let gcanvas;

function game() {
	const [score, setScore] = useState("");
	let Xpos: number;
	let Ypos: number;
	let isDown = false;
	const [lineWidth, setLineWidth] = useState(50);
	const [color, setColor] = useState("black");
	const [HEIGHT, setHEIGHT] = useState(0);
	const [WIDTH, setWIDTH] = useState(0);

	useEffect(() => {
		setHEIGHT(
			window.innerWidth > 820
				? window.innerHeight / 1.2
				: window.innerWidth
		);
		setWIDTH(
			window.innerWidth > 820
				? window.innerWidth / 1.1
				: window.innerWidth
		);
		onmousedown = function (e) {
			isDown = true;
			this.onmousemove = (e) => {
				if (isDown) {
					Xpos = e.offsetX;
					Ypos = e.offsetY;
				}

				this.onmouseup = () => {
					isDown = false;
				};
			};
		};
		if (window.innerWidth < 820) {
			window.ontouchmove = function (e) {
				console.log(WIDTH);

				Xpos = e.touches[0].clientX;
				Ypos = e.touches[0].clientY - HEIGHT;
			};
		}
	});

	const canvas: any = useRef(null);

	function Draw() {
		const c = canvas.current && canvas.current.getContext("2d");
		gcanvas = canvas.current;

		if (c) {
			c.fillStyle = color;
			c.beginPath();
			c.arc(Xpos, Ypos, lineWidth, 0, 2 * Math.PI);
			c.fill();
		}
	}
	return (
		<div>
			Score: {score}
			<canvas
				id="canvas"
				onMouseMove={Draw}
				onTouchMove={Draw}
				ref={canvas}
				width={WIDTH}
				height={HEIGHT}
			/>
		</div>
	);
}

export default game;
