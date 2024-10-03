const express = require("express");
const http = require("http");
const pg = require("pg"); // untuk connect ke database di postgresql
const { Client } = pg;
const PORT = 3000;

const app = express();
const server = http.createServer(app);
const client = new Client({
	user: "postgres",
	host: "localhost",
	database: "car_rental",
	password: "1234",
	port: 5432,
});

client.connect((err) => {
	if (err) {
		console.error("connection error", err.stack);
	} else {
		console.log("connected");
	}
});

app.use(express.json()); // sebagai middleware

app.get("/", (req, res) => {
	res.status(200).send("Hello World");
});

app.get("/about", (req, res) => {
	res.status(200).send("page about");
});

app.post("/register", (req, res) => {
	console.log(req.body);
	res.status(200).send(`register success, email: ${req.body.email}`);
});

// use async await
app.get("/cars", async (req, res) => {
	const data = await client.query("SELECT * FROM cars");
	console.log(data);
	res.status(200).json(data.rows);
});

// use callback
app.get("/cars2", (req, res) => {
	client
		.query("SELECT * FROM cars")
		.then((data) => {
			res.status(200).json(data.rows);
		})
		.catch((err) => {
			console.log(err);
		});
});

// Create data
app.post("/cars", async (req, res) => {
	const {
		manufactur,
		type,
		licenseNumber,
		seat,
		baggage,
		transmission,
		year,
		name,
		description,
		isDriver,
		isAvailable,
		img,
		price,
		createdDt,
		updatedDt,
		createdBy,
		updatedBy,
	} = req.body;
	try {
		const result = await client.query(
			'INSERT INTO cars (manufactur, type, "licenseNumber", seat, baggage, transmission, year,   name,description, "isDriver", "isAvailable", img, price, "createdDt", "updatedDt", "createdBy", "updatedBy") VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17 ) RETURNING *',
			[
				manufactur,
				type,
				licenseNumber,
				seat,
				baggage,
				transmission,
				year,
				name,
				description,
				isDriver,
				isAvailable,
				img,
				price,
				createdDt,
				updatedDt,
				createdBy,
				updatedBy,
			]
		);
		console.log(result);

		res.status(201).json(result.rows[0]);
	} catch (err) {
		console.error(err);
		res.status(500).send("Error creating car");
	}
});

// Update data
app.put("/cars/:id", async (req, res) => {
	const {
		manufactur,
		type,
		licenseNumber,
		seat,
		baggage,
		transmission,
		year,
		name,
		description,
		isDriver,
		isAvailable,
		img,
		price,
		createdDt,
		updatedDt,
		createdBy,
		updatedBy,
	} = req.body;
	const { id } = req.params;
	try {
		const result = await client.query(
			`UPDATE cars SET manufactur = $1, type = $2, "licenseNumber" = $3, seat = $4, baggage = $5, transmission = $6, year = $7, name = $8, description = $9, "isDriver" = $10, "isAvailable" = $11, img = $12, price = $13, "createdDt" = $14, "updatedDt" = $15, "createdBy" = $16, "updatedBy" = $17 WHERE id = $18 RETURNING *`,
			[
				manufactur,
				type,
				licenseNumber,
				seat,
				baggage,
				transmission,
				year,
				name,
				description,
				isDriver,
				isAvailable,
				img,
				price,
				createdDt,
				updatedDt,
				createdBy,
				updatedBy,
				id,
			]
		);
		console.log(result);

		if (result.rows.length === 0) {
			return res.status(404).send("Car not found");
		}
		res.status(200).json(result.rows[0]);
	} catch (err) {
		console.error(err);
		res.status(500).send("Error updating car");
	}
});

// Harus di akhir
server.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});
