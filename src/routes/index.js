const controllers = require("../controllers");

module.exports = function (app) {
	app.use("/api/v1/cars", controllers.cars);
};

// const express = require("express");
// const router = express.Router();
// const controller = require("../controllers");

// router.get("/api/v1/cars", controller.cars.getCars);
// router.post("/api/v1/cars", controller.cars.createCar);
// router.get("/api/v1/cars/:id", controller.cars.getCarById);
// router.put("/api/v1/cars/:id", controller.cars.updateCar);
// router.delete("/api/v1/cars/:id", controller.cars.deleteCar);

// module.exports = router;
