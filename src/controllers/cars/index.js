const pool = require("../../config/db");

class Cars {
	async getCars(req, res) {
		try {
			const cars = await pool.query(
				"SELECT id, name, year, manufactur, price, img from cars"
			);
			res.status(200).json(cars.rows);
			console.log(cars.rows);
		} catch (error) {
			console.log(error);
			res.status(500).json("Internal Server Error");
		}
	}

	//PARAMETER ADALAH QUERY UNTUK MENGAMBIL DATA DARI DATABASE DAN PARAMETER UNTUK MENGAMBIL DATA DARI URL
	//QUERY ADALAH MENGAMBIL DATA DARI DATABASE

	async getCarById(req, res) {
		const { id } = req.params; // id dari parameter harus sesuai dengan routes yang di cantumkan
		try {
			const cars = await pool.query("SELECT * from cars where id=$1", [id]);
			if (cars.rows.length > 0) {
				res.status(200).json(cars.rows[0]);
			} else {
				res.status(404).json("Car not found");
			}
		} catch (error) {
			console.log(error);
			res.status(500).json("Internal Server Error");
		}
	}

	async createCar(req, res) {
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
		} = req.body;
		try {
			const newCar = await pool.query(
				'INSERT INTO cars (manufactur, type, "licenseNumber", seat, baggage, transmission, year,   name,description, "isDriver", "isAvailable", img, price) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13 )',
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
				]
			);
			// res.status(201).json(newCar.rows[0]);
			res.status(201).json("Car created");
		} catch (error) {
			console.log(error);
			res.status(500).json("Internal Server Error");
		}
	}

	async updateCar(req, res) {
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
		} = req.body;
		const { id } = req.params;
		try {
			const updatedCar = await pool.query(
				'UPDATE cars SET manufactur=$1, type=$2, "licenseNumber"=$3, seat=$4, baggage=$5, transmission=$6, year=$7, name=$8, description=$9, "isDriver"=$10, "isAvailable"=$11, img=$12, price=$13 WHERE id=$14 RETURNING *',
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
					id,
				]
			);
			if (updatedCar.rows.length > 0) {
				res.status(200).json(updatedCar.rows[0]);
			} else {
				res.status(404).json("Car not found");
			}
		} catch (error) {
			console.log(error);
			res.status(500).json("Internal Server Error");
		}
	}

	async deleteCar(req, res) {
		const { id } = req.params;
		try {
			const deletedCar = await pool.query("DELETE FROM cars WHERE id=$1", [id]);
			if (deletedCar.rowCount === 0)
				return res.status(404).json("Car not found");
			res.status(200).json("Car deleted successfully");
		} catch (error) {
			console.log(error);
			res.status(500).json("Internal Server Error");
		}
	}
}

module.exports = new Cars(); // kenapa pakai new? karena dia adalah class, class adalah blueprint dari object sehingga harus di instansiasi terlebih dahulu
