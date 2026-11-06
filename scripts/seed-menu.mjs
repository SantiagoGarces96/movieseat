// Deja el menú igual a la confitería de Cine Colombia (multiplex Andino): mismos
// productos y precios, con las fotos del proyecto. Se busca por nombre, así que
// se puede correr varias veces sin duplicar nada.
// Uso: npm run seed-menu
import mongoose from "mongoose";

const { MONGODB_URI } = process.env;
if (!MONGODB_URI) {
  console.error("Falta MONGODB_URI");
  process.exit(1);
}

const combo = (name, description, price, size, image) => ({
  name,
  description,
  price,
  size,
  image: `/images/foods/${image}.webp`,
  category: "combos",
  type: "combo",
});
const food = (name, description, price, size, type, image) => ({
  name,
  description,
  price,
  size,
  image: `/images/foods/${image}.webp`,
  category: "foods",
  type,
});
const drink = (name, description, price, size, image) => ({
  name,
  description,
  price,
  size,
  image: `/images/foods/${image}.webp`,
  category: "drinks",
  type: "drink",
});

const menu = [
  combo(
    "Combo Pro para dos",
    "1 Crispeta mediana de sal 120 g + 2 Gaseosas medianas 960 ml + 2 Perros calientes o sándwich",
    67900,
    "extralarge",
    "combo-dos",
  ),
  combo(
    "Combo Fan para dos",
    "1 Crispeta grande de sal 150 g + 2 Gaseosas medianas 960 ml",
    43900,
    "large",
    "combo-dos",
  ),
  combo(
    "Combo Pro",
    "1 Crispeta de sal 100 g + 1 Gaseosa mediana 960 ml + 1 Perro caliente o sándwich",
    42400,
    "large",
    "combo",
  ),
  combo(
    "Combo Deli",
    "1 Crispeta pequeña 100 g + 1 Gaseosa mediana 960 ml + 1 Queso cheddar + 1 Galleta Chocoramo",
    29900,
    "large",
    "combo",
  ),
  combo(
    "Combo Fan",
    "1 Crispeta pequeña de sal 100 g + 1 Gaseosa mediana 960 ml",
    24900,
    "small",
    "combo",
  ),
  combo(
    "Combo Fan Junior",
    "1 Caja de crispetas de sal 55 g + 1 Gaseosa pequeña 640 ml",
    19900,
    "small",
    "combo",
  ),

  food(
    "Crispeta de sal grande 150 g",
    "Crispetas de sal recién hechas.",
    26900,
    "extralarge",
    "popcorn",
    "crispetas",
  ),
  food(
    "Crispeta de sal mediana 120 g",
    "Crispetas de sal recién hechas.",
    24900,
    "large",
    "popcorn",
    "crispetas",
  ),
  food(
    "Adición completa de caramelo",
    "Esta adición no incluye las crispetas.",
    4700,
    "large",
    "popcorn",
    "caramelo",
  ),
  food(
    "Adición media de caramelo",
    "Esta adición no incluye las crispetas.",
    3700,
    "small",
    "popcorn",
    "caramelo",
  ),
  food(
    "Porción de queso cheddar 100 g",
    "Queso cheddar fundido para acompañar.",
    9500,
    "small",
    "fast_food",
    "nachos",
  ),
  food(
    "Nachos con queso cheddar",
    "Nachos crujientes con queso cheddar.",
    17900,
    "large",
    "fast_food",
    "nachos",
  ),
  food(
    "Perro caliente",
    "Pan suave, salchicha y salsas.",
    22400,
    "small",
    "fast_food",
    "perro-caliente",
  ),
  food(
    "Sándwich de jamón y queso",
    "Sándwich de jamón con queso.",
    16500,
    "small",
    "fast_food",
    "sandwich",
  ),
  food(
    "Sándwich de quesos",
    "Sándwich con mezcla de quesos.",
    16500,
    "small",
    "fast_food",
    "sandwich",
  ),
  food(
    "Chocolatina Jet 25 g",
    "Chocolatina con leche.",
    5700,
    "small",
    "bakery",
    "chocolatina",
  ),
  food(
    "Gomas gusanos ácidos 100 g",
    "Gomas ácidas en forma de gusano.",
    7200,
    "small",
    "bakery",
    "gomas",
  ),
  food(
    "Gomas Trululú sabores 100 g",
    "Gomas de sabores surtidos.",
    7200,
    "small",
    "bakery",
    "gomas",
  ),
  food(
    "Galletas Oreo 54 g",
    "Paquete de galletas rellenas.",
    5500,
    "small",
    "bakery",
    "galletas",
  ),
  food(
    "Baby Johnnys 48 g",
    "Ponqué pequeño para el dulce.",
    6900,
    "small",
    "bakery",
    "galletas",
  ),
  food(
    "Galleta Ramo 60 g",
    "Galleta cubierta para el dulce.",
    5700,
    "small",
    "bakery",
    "galletas",
  ),
  food(
    "Paquete de nachos 60 g",
    "Nachos crujientes en paquete.",
    9900,
    "small",
    "fast_food",
    "nachos",
  ),

  drink(
    "Gaseosa grande 1280 ml",
    "Gaseosa fría con hielo.",
    17900,
    "extralarge",
    "gaseosa",
  ),
  drink(
    "Gaseosa mediana 960 ml",
    "Gaseosa fría con hielo.",
    14500,
    "large",
    "gaseosa",
  ),
  drink(
    "Gaseosa pequeña 640 ml",
    "Gaseosa fría con hielo.",
    11500,
    "small",
    "gaseosa",
  ),
  drink(
    "Agua Manantial 600 ml",
    "Botella de agua personal.",
    6900,
    "small",
    "agua",
  ),
  drink(
    "Brisa lima limón 600 ml",
    "Agua saborizada en botella.",
    6900,
    "small",
    "agua",
  ),
  drink(
    "Brisa manzana 600 ml",
    "Agua saborizada en botella.",
    6900,
    "small",
    "agua",
  ),
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

// Si existe otro combo con una foto externa, también usa las del proyecto.
const otherCombos = await foods
  .find(
    { category: "combos", image: { $not: /^\/images\// } },
    { projection: { name: 1 } },
  )
  .toArray();
for (const { _id, name } of otherCombos) {
  const image = /dos|pareja/i.test(name)
    ? "/images/foods/combo-dos.webp"
    : "/images/foods/combo.webp";
  await foods.updateOne({ _id }, { $set: { image, updatedAt: new Date() } });
}

console.log(
  `Menú listo: ${added} nuevos de ${menu.length}, ${otherCombos.length} combos extra con foto nueva.`,
);
await mongoose.disconnect();
