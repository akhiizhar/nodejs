const pg = require("pg"); // untuk connect ke database di postgresql
const { Pool } = pg;
// perbedaan client dan pool adalah client hanya bisa melakukan satu query sedangkan pool bisa melakukan banyak query
const { DB_PASS, DB_USER, DB_HOST, DB_PORT, DB } = process.env;

const pool = new Pool({
	user: "postgres",
	host: "localhost",
	database: "car_rental",
	password: "1234",
	port: 5432,
});

pool.on("error", (err, client) => {
	console.error("Unexpected error on idle client", err);
	process.exit(-1);
});

pool.connect((err, connection) => {
	if (err) throw err;
	console.log("Connected to database");
	connection.release();
});

module.exports = pool;
