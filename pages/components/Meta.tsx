import React from "react";
import Head from "next/head";

interface info {
	title: string;
	keywords: string;
	description: string;
}

function Meta(i: info) {
	return (
		<Head>
			<meta
				name="viewport"
				content="width=device-width, initial-scale=1"
			/>
			<meta name="keywords" content={i.keywords} />
			<meta name="description" content={i.description} />
			<meta charSet="utf-8" />
			<link rel="icon" href="/favicon.ico" />
			<title>{i.title}</title>
		</Head>
	);
}

Meta.defaultProps = {
	title: "Duel game",
	keywords:
		"test, site, programming, web, account, testing, zpravy, messages, postine, post, hello, ",
	description: "dual game",
};

export default Meta;
