import React, { useEffect, useRef, useState } from "react";
import Meta from "./components/Meta";

function game() {
	const canvasRef = useRef(null);
	const [width, setWidth] = useState(0);
	const [height, setHeight] = useState(0);

	class Player {
		x: number;
		y: number;
		color: String;
		size: number;
		constructor(x: number, y: number, color: String, size: number) {
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
		x: number;
		y: number;
		color: String;
		size: number;
		velocity: number;
		constructor(
			x: number,
			y: number,
			color: String,
			size: number,
			velocity: number
		) {
			this.x = x;
			this.y = y;
			this.color = color;
			this.size = size;
			this.velocity = velocity;
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
		update() {
			this.x = this.x + this.velocity;
		}
	}
	const projectile = new Projectile(width / 2, height / 2, "green", 20, 1);
	useEffect(() => {
		const canvas: any = canvasRef.current;

		const c = canvas && canvas.getContext("2d");
		setHeight(window.innerHeight - 20);
		setWidth(window.innerWidth - 20);
		player.draw(c);

		addEventListener("click", (e) => {
			animate();
		});
		function animate() {
			if (projectile.x === 0) return;

			requestAnimationFrame(animate);
			projectile.draw(c);
			projectile.update();
		}
	}, [Player, Projectile]);

	return (
		<div>
			<Meta title="game" />
			<canvas ref={canvasRef} width={width} height={height} />
		</div>
	);
}

export default game;
