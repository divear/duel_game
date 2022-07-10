import React, { useEffect, useRef, useState } from "react";

function game() {
	const canvasRef: any = useRef();
	const canvas = canvasRef.current;
	const c = canvas && canvas.getContext("2d");
	const [width, setWidth] = useState(0);
	const [height, setHeight] = useState(0);

	useEffect(() => {
		setHeight(window.innerHeight);
		setWidth(window.innerWidth);
		console.log([width, height]);
	}, []);

	class Player {
		x: Number;
		y: Number;
		color: String;
		size: Number;
		constructor(x: Number, y: Number, color: String, size: Number) {
			this.x = x;
			this.y = y;
			this.color = color;
			this.size = size;
		}
		draw() {
			if (!c) return;
			c.beginPath();
			c.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
			c.fill();
		}
	}
	const player = new Player(2, 2, "red", 21);
	console.log(player);
	player.draw();

	return (
		<div>
			<canvas ref={canvas} width={width} height={height} />
		</div>
	);
}

export default game;
