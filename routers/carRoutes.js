import { Router } from "express";
import * as Car from "../util/car.js";

const router = Router();

router.get("/", (req, res) => {
  const cars = Car.getAllCars();
  if (cars.length < 1) {
    return res.status(404).json({ message: "Cars not found" });
  }
  return res.status(200).json(cars);
});

router.post("/", (req, res) => {
  const { brand, color, lplate } = req.body;
  if (!brand || !color || !lplate) {
    return res.status(404).json({ message: "Missing data" });
  }

  const savedCar = Car.saveCar(brand, color, lplate);
  if (savedCar.changes < 1) {
    return res.status(500).json({ message: "Car save failed" });
  }
  return res.status(203).json({ id: savedCar.lastInsertRowid });
});

router.put("/:id", (req, res) => {
  const { brand, color, lplate } = req.body;
  if (!brand || !color || !lplate) {
    return res.status(404).json({ message: "Missing data" });
  }

  const car = Car.getCarById(req.params.id);
  if (!car) {
    return res.status(404).json({ message: "Car not found" });
  }

  const updatedCar = Car.updateCar(car.id, brand, color, lplate);
  if (updatedCar.changes < 1) {
    return res.status(500).json({ message: "Car update failed" });
  }
  return res.status(204).json({ message: "Updated" });
});

export default router;
