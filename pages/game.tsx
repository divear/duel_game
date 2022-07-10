import React, { useEffect, useRef } from "react";

function game() {
	const canvas: any = useRef(null);
	const c = canvas.current && canvas.current.getContext("2d");

	useEffect(() => {
		canvas.height = window.innerHeight;
		canvas.width = window.innerWidth;
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
	}
	const player = new Player(2, 2, "red", 21);
	console.log(player);

	return (
		<div>
			<canvas ref={canvas}></canvas>
		</div>
	);
}

export default game;
