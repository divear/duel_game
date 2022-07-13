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
	const player = new Player(x, y, "teal", 41);

	class Projectile {
		x: number;
		y: number;
		color: String;
		size: number;
		velocity: { x: number; y: number };
		constructor(
			x: number,
			y: number,
			color: String,
			size: number,
			velocity: { x: number; y: number }
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
		update(c: any) {
			if (this.x > 3000 || this.x < 0 || this.y < 0 || this.y > 3000)
				return;
			this.draw(c);
			this.x = this.x + this.velocity.x;
			this.y = this.y + this.velocity.y;
		}
	}

	const projectiles: any = [];

	class Enemy {
		x: number;
		y: number;
		color: String;
		size: number;
		velocity: { x: number; y: number };
		constructor(
			x: number,
			y: number,
			color: String,
			size: number,
			velocity: { x: number; y: number }
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
		update(c: any) {
			if (this.x > 3000 || this.x < 0 || this.y < 0 || this.y > 3000)
				return;
			this.draw(c);
			this.x = this.x + this.velocity.x;
			this.y = this.y + this.velocity.y;
		}
	}
	const enemies: any = [];

	useEffect(() => {
		const canvas: any = canvasRef.current;

		const c = canvas && canvas.getContext("2d");
		setHeight(window.innerHeight - 20);
		setWidth(window.innerWidth - 20);
		player.draw(c);

		addEventListener("mousemove", (e) => {
			const angle = Math.atan2(
				e.clientY - height / 2,
				e.clientX - width / 2
			);
			console.log(angle);
			const velocity = {
				x: Math.cos(angle),
				y: Math.sin(angle),
			};

			projectiles.push(
				new Projectile(width / 2, height / 2, "yellow", 5, velocity)
			);
			animate();
		});
		function spawnEnemies() {
			setInterval(() => {
				let x: number;
				let y: number;
				if (Math.round(Math.random())) {
					x = Math.round(Math.random()) ? 0 : width;
					y = Math.random() * height;
				} else {
					x = Math.random() * width;
					y = Math.round(Math.random()) ? 0 : height;
				}

				const angle = Math.atan2(height / 2 - y, width / 2 - x);
				console.log(angle);
				const velocity = {
					x: Math.cos(angle) / 3,
					y: Math.sin(angle) / 3,
				};

				enemies.push(new Enemy(x, y, "red", 20, velocity));
			}, 1000);
		}
		spawnEnemies();
		function animate() {
			if (projectiles[0] && projectiles[0].x === 0) return;
			requestAnimationFrame(animate);
			c.clearRect(0, 0, width, height);
			player.draw(c);
			projectiles.forEach((p: any) => {
				p.update(c);
			});
			enemies.forEach((p: any) => {
				p.update(c);
			});
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
