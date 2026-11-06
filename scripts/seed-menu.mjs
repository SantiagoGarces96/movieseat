// Agrega el menú de comida y bebidas, y cambia las fotos de los combos por las
// del proyecto. Se puede correr varias veces: no duplica nada.
// Uso: npm run seed-menu
import mongoose from "mongoose";

const { MONGODB_URI } = process.env;
if (!MONGODB_URI) {
  console.error("Falta MONGODB_URI");
  process.exit(1);
}

const menu = [
  { name: "Crispetas pequeñas", description: "Crispetas recién hechas con mantequilla.", price: 9900, size: "small", category: "foods", type: "popcorn", image: "/images/foods/crispetas.webp" },
  { name: "Crispetas grandes", description: "Crispetas recién hechas para compartir.", price: 15900, size: "extralarge", category: "foods", type: "popcorn", image: "/images/foods/crispetas.webp" },
  { name: "Perro caliente", description: "Pan suave, salchicha y salsas.", price: 13900, size: "small", category: "foods", type: "fast_food", image: "/images/foods/perro-caliente.webp" },
  { name: "Nachos con queso", description: "Nachos crujientes con queso fundido.", price: 16900, size: "large", category: "foods", type: "fast_food", image: "/images/foods/nachos.webp" },
  { name: "Chocolatina", description: "Chocolatina con caramelo para el dulce.", price: 7500, size: "small", category: "foods", type: "bakery", image: "/images/foods/chocolatina.webp" },
  { name: "Gaseosa pequeña", description: "Gaseosa fría con hielo.", price: 7900, size: "small", category: "drinks", type: "drink", image: "/images/foods/gaseosa.webp" },
  { name: "Gaseosa grande", description: "Gaseosa fría con hielo para toda la película.", price: 11900, size: "extralarge", category: "drinks", type: "drink", image: "/images/foods/gaseosa.webp" },
  { name: "Agua", description: "Botella de agua personal.", price: 5900, size: "small", category: "drinks", type: "drink", image: "/images/foods/agua.webp" },
];

await mongoose.connect(MONGODB_URI, { serverSelectionTimeoutMS: 15000 });
const foods = mongoose.connection.collection("foods");

let added = 0;
for (const item of menu) {
  const now = new Date();
  const { upsertedCount } = await foods.updateOne(
    { name: item.name },
    {
      $set: { ...item, updatedAt: now },
      $setOnInsert: { availableAmount: 100, createdAt: now },
    },
    { upsert: true },
  );
  added += upsertedCount;
}

const combos = await foods.find({ category: "combos" }, { projection: { name: 1 } }).toArray();
for (const { _id, name } of combos) {
  const image = /dos|pareja/i.test(name) ? "/images/foods/combo-dos.webp" : "/images/foods/combo.webp";
  await foods.updateOne({ _id }, { $set: { image, updatedAt: new Date() } });
}

console.log(`Menú listo: ${added} nuevos de ${menu.length}, ${combos.length} combos con foto nueva.`);
await mongoose.disconnect();
