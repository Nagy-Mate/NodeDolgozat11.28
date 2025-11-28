import db from "./database.js";

db.prepare(
  `CREATE TABLE IF NOT EXISTS cars(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    brand TEXT, 
    color TEXT, 
    lplate TEXT)`
).run();

export const getAllCars = () => db.prepare(`SELECT * FROM cars`).all();

export const getCarById = (id) =>
  db.prepare(`SELECT * FROM cars WHERE id = ?`).get(id);

export const saveCar = (brand, color, lplate) =>
  db
    .prepare(`INSERT INTO cars(brand, color, lplate) VALUES(?,?,?) `)
    .run(brand, color, lplate);

export const updateCar = (id, brand, color, lplate) =>
  db
    .prepare(`UPDATE cars SET brand = ?, color = ?, lplate = ? WHERE id = ? `)
    .run(brand, color, lplate, id);
