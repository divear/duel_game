import React, { useEffect, useRef, useState } from "react";
import Meta from "./components/Meta";

function game() {
	const canvasRef = useRef(null);
	const [width, setWidth] = useState(0);
	const [height, setHeight] = useState(0);

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
		draw(c: any) {
			if (typeof window === "undefined") {
				console.log("iam server lol");
				return;
			}

			console.log("draw");
			console.log(c);
			c.fillText("Hello World", 10, 50);
			c.beginPath();
			c.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
			c.fill();
		}
	}
	const player = new Player(100, 100, "red", 41);
	console.log(player);

	useEffect(() => {
		const canvas: any = canvasRef.current;
		console.log(canvas);

		const c = canvas && canvas.getContext("2d");
		setHeight(window.innerHeight / 2);
		setWidth(window.innerWidth / 2);
		player.draw(c);
	}, [player]);

	return (
		<div>
			<Meta title="game" />
			<canvas ref={canvasRef} width={width} height={height} />
		</div>
	);
}

export default game;
