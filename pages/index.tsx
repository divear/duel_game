import type { NextPage } from "next";

const Home: NextPage = () => {
	return (
		<div>
			<button
				onClick={() => (window.location.href = "/game")}
				className="join"
			>
				join
			</button>
		</div>
	);
};

export default Home;
