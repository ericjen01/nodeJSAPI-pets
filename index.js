const PORT = process.env.PORT || 8000;
const express = require("express");
const axios = require("axios");
const cheerio = require("cheerio");
const res = require("express/lib/response");
const app = express();
const articles = [];

const newspapers = [
	{
		name: "globalnews",
		address: "https://globalnews.ca/tag/pets/",
		base: "",
	},
	{
		name: "cbcnews",
		address: "https://www.cbc.ca/life/pets",
		base: "https://www.cbc.ca/life/pets",
	},
];

newspapers.forEach((newspaper) => {
	axios
		.get(newspaper.address)

		.then((response) => {
			const html = response.data;
			const $ = cheerio.load(html);

			$(".card").filter(function () {
				const title = $("h3", this).text();
				const time = $("time", this).text();
				const url = $(this).attr("href");
				const image = $("img", this).attr("src");

				articles.push({
					title: title,
					time: time,
					url: url,
					image: image,
					source: newspaper.name,
				});
			});
		});
});

app.get("/", (req, res) => {
	res.json("Welcome to my Pet News API");
});

app.get("/news", (req, res) => {
	res.json(articles);
});

app.listen(PORT, () => console.log(`server running on PORT ${PORT}`));

/*-----------------------------------------------------------------------------------*/

/*
			$(".card").filter(function () {
				const title = $("h3", this).text();
				const time = $("time", this).text();
				const url = $(this).attr("href");
				const image = $("img", this).attr("src");

				//	console.log(title);
				//console.log(time);
				//	console.log(url);
				//console.log(image);
				//	console.log("-------------------");

				articles.push({
					title: title,
					time: time,
					url: newspaper.base + url,
					image: image,
					source: newspaper.name,
				});
*/

/*
const PORT = process.env.PORT || 8000;
const express = require("express");
const axios = require("axios");
const cheerio = require("cheerio");
const res = require("express/lib/response");
const app = express();
const articles = [];

const newspapers = [
	{
		name: "globalnews",
		address: "https://globalnews.ca/tag/pets/",
		base: "",
	},
	{
		name: "cbcnews",
		address: "https://www.cbc.ca/life/pets",
		base: "",
	},
];

newspapers.forEach((newspaper) => {
	axios
		.get(newspaper.address)

		.then((response) => {
			const html = response.data;
			const $ = cheerio.load(html);

			$('a:contains("pet")', html).each(function () {
				const title = $(this)
					.text()
					.replace(/[\n\t\r]/g, "");
				const url = $(this).attr("href");
				articles.push({
					title,
					url: newspaper.base + url,
					source: newspaper.name,
				});
			});
		});
});

app.get("/", (req, res) => {
	res.json("Welcome to my Pet News API");
});

app.get("/news", (req, res) => {
	res.json(articles);
});

app.get("/news/:newspaperId", async (req, res) => {
	const newspaperId = req.params.newspaperId;

	const newspaperAddress = newspapers.filter(
		(newspaper) => newspaper.name == newspaperId
	)[0].address;

	const newspaperBase = newspapers.filter(
		(newspaper) => newspaper.name == newspaperId
	)[0].base;

	axios
		.get(newspaperAddress)
		.then((response) => {
			const html = response.data;
			const $ = cheerio.load(html);
			const specificArticles = [];

			$('a:contains("pets")', html).each(function () {
				const title = $(this)
					.text()
					.replace(/[\n\t\r]/g, "");
				const url = $(this).attr("href");
				specificArticles.push({
					title,
					url: newspaperBase + url,
					source: newspaperId,
				});
			});
			res.json(specificArticles);
		})
		.catch((err) => console.log(err));
});

app.listen(PORT, () => console.log(`server running on PORT ${PORT}`));
*/
