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
				return;
			}

			c.beginPath();
			c.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
			c.fillStyle = this.color;
			c.fill();
		}
	}
	const [x, y] = [width / 2, height / 2];
	const player = new Player(x, y, "red", 41);

	class Projectile {
		x: Number;
		y: Number;
		color: String;
		size: Number;
		velocity: Number;
		constructor(
			x: Number,
			y: Number,
			color: String,
			size: Number,
			velocity: Number
		) {
			this.x = x;
			this.y = y;
			this.color = color;
			this.size = size;
			this.velocity = velocity;
		}
		draw(c: any) {
			if (typeof window === "undefined") {
				console.log("iam server lol");
				return;
			}

			c.beginPath();
			c.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
			c.fillStyle = this.color;
			c.fill();
		}
	}
	useEffect(() => {
		const canvas: any = canvasRef.current;
		console.log(canvas);

		const c = canvas && canvas.getContext("2d");
		setHeight(window.innerHeight - 20);
		setWidth(window.innerWidth - 20);
		player.draw(c);
		addEventListener("click", (e) => {
			const projectile = new Projectile(
				e.clientX,
				e.clientY,
				"green",
				20,
				4
			);
			projectile.draw(c);
		});
	}, [Player]);

	return (
		<div>
			<Meta title="game" />
			<canvas ref={canvasRef} width={width} height={height} />
		</div>
	);
}

export default game;
