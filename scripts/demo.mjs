// Levanta la app con una base de datos temporal y películas ficticias, sin
// necesidad de MongoDB Atlas ni de claves de TMDB. Los datos se borran al cerrar.
// Uso: npm run demo
import bcrypt from "bcryptjs";
import { execFileSync, spawn } from "node:child_process";
import { randomBytes } from "node:crypto";
import { mkdirSync, writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import sharp from "sharp";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const demoDir = path.join(root, "public", "demo");
const DAY = 24 * 60 * 60 * 1000;

// Solo existen en la base temporal del demo.
const DEMO_ADMIN = { email: "admin@movieseat.test", password: "demo-admin-1234", name: "Admin", role: "admin" };
const DEMO_CLIENT = { email: "cliente@movieseat.test", password: "demo-cliente-1234", name: "Cliente", role: "client" };

const billboard = [
  ["La última función", "Drama", "#7c2d12", "#fbbf24", "Un proyeccionista descubre que su viejo cine guarda una película que nadie recuerda haber filmado."],
  ["Marea alta", "Aventura", "#0c4a6e", "#38bdf8", "Una capitana sin barco y una cartógrafa novata buscan una isla que aparece solo una vez por década."],
  ["Código Andino", "Suspenso", "#1e1b4b", "#a78bfa", "Una ingeniera recibe un mensaje cifrado desde una estación abandonada en lo alto de la cordillera."],
  ["Verano en Salento", "Comedia", "#14532d", "#86efac", "Tres hermanos heredan una finca cafetera y solo tienen un verano para ponerse de acuerdo."],
  ["Órbita cero", "Ciencia ficción", "#0f172a", "#22d3ee", "La tripulación de una nave de carga pierde el contacto con la Tierra y encuentra una señal imposible."],
  ["El jardín de Lucía", "Familiar", "#831843", "#f9a8d4", "Una niña y su abuelo convierten un lote vacío en el lugar más querido del barrio."],
  ["Noche de tango", "Romance", "#450a0a", "#f87171", "Dos bailarines rivales deben formar pareja para salvar la academia donde se conocieron."],
];

const upcoming = [
  ["Sombras de neón", "Acción", "#3b0764", "#e879f9", "Una mensajera nocturna se ve envuelta en un robo que sacude a toda la ciudad."],
  ["El faro", "Misterio", "#134e4a", "#5eead4", "Un fotógrafo viaja a un faro remoto para retratarlo y encuentra rastros de quien vivió allí."],
  ["Rumbo al sur", "Aventura", "#78350f", "#fcd34d", "Dos amigos cruzan el país en un bus viejo para cumplir una promesa de la infancia."],
  ["Cometa", "Animación", "#1e3a8a", "#93c5fd", "Una cometa de papel cobra vida y emprende un viaje para volver a casa."],
  ["Doble turno", "Comedia", "#7f1d1d", "#fdba74", "Un chef y una médica comparten apartamento sin coincidir nunca, hasta que un apagón los reúne."],
  ["Ciudad dormida", "Suspenso", "#111827", "#9ca3af", "Una madrugada, todos los relojes de la ciudad se detienen a la misma hora."],
];

// El resto del menú lo agrega scripts/seed-menu.mjs, igual que en la base real.
const foods = [
  ["Combo pareja", "Crispetas grandes y dos gaseosas.", 38000, "extralarge", "combos", "combo", "#5b21b6", "#c4b5fd"],
];

const xml = (text) => text.replace(/&/g, "&amp;").replace(/</g, "&lt;");

const art = (width, height, dark, light, label) => `
<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="${dark}"/><stop offset="1" stop-color="#0b0d12"/>
    </linearGradient>
    <radialGradient id="r" cx="0.75" cy="0.25" r="0.7">
      <stop offset="0" stop-color="${light}" stop-opacity="0.75"/><stop offset="1" stop-color="${light}" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <rect width="100%" height="100%" fill="url(#g)"/>
  <rect width="100%" height="100%" fill="url(#r)"/>
  <circle cx="${width * 0.72}" cy="${height * 0.3}" r="${Math.min(width, height) * 0.2}" fill="${light}" opacity="0.5"/>
  ${label ? `<text x="${width * 0.07}" y="${height * 0.9}" font-family="Arial" font-weight="700" font-size="${width * 0.085}" fill="#ffffff">${xml(label)}</text>` : ""}
</svg>`;

const saveImage = async (name, svg) => {
  await sharp(Buffer.from(svg)).png().toFile(path.join(demoDir, name));
  return `/demo/${name}`;
};

const buildMovie = async ([title, genre, dark, light, description], index, status) => {
  const offset = status === "billboard" ? -(index + 1) * 6 * DAY : (index + 1) * 12 * DAY;
  const slug = `${status}-${index}`;
  return {
    title,
    description,
    genre: [genre],
    status,
    duration: 92 + index * 9,
    releaseDate: new Date(Date.now() + offset),
    director: "Dirección de ejemplo",
    cast: ["Reparto de ejemplo 1", "Reparto de ejemplo 2", "Reparto de ejemplo 3"],
    language: ["Español"],
    subtitles: false,
    trailer: "",
    poster: await saveImage(`${slug}-poster.png`, art(600, 900, dark, light, title)),
    backdrop: await saveImage(`${slug}-backdrop.png`, art(1600, 900, dark, light, "")),
    sessions: [],
    createdAt: new Date(),
    updatedAt: new Date(),
  };
};

mkdirSync(demoDir, { recursive: true });
writeFileSync(path.join(demoDir, ".gitkeep"), "");

console.log("Iniciando base de datos temporal (la primera vez descarga MongoDB)...");
const mongo = await MongoMemoryServer.create();
const uri = mongo.getUri("movieseat");

await mongoose.connect(uri);
const movies = [
  ...(await Promise.all(billboard.map((movie, i) => buildMovie(movie, i, "billboard")))),
  ...(await Promise.all(upcoming.map((movie, i) => buildMovie(movie, i, i < 2 ? "pre-sale" : "upcoming")))),
];
await mongoose.connection.collection("movies").insertMany(movies);
await mongoose.connection.collection("foods").insertMany(
  await Promise.all(
    foods.map(async ([name, description, price, size, category, type, dark, light], i) => ({
      name,
      description,
      price,
      size,
      category,
      type,
      availableAmount: 50,
      image: await saveImage(`food-${i}.png`, art(800, 600, dark, light, "")),
      createdAt: new Date(),
      updatedAt: new Date(),
    })),
  ),
);
const seatMap = (total) => {
  const seats = {};
  for (let row = 0; row < total / 10; row++) {
    for (let number = 1; number <= 10; number++) {
      seats[String.fromCharCode(65 + row) + number] = true;
    }
  }
  return seats;
};

const rooms = [
  { name: "Sala 1", room: "2D", totalSeatsPreferential: 30, totalSeatsGeneral: 70, totalSeats: 100 },
  { name: "Sala 2", room: "3D", totalSeatsPreferential: 20, totalSeatsGeneral: 50, totalSeats: 70 },
  { name: "Sala 3", room: "IMAX", totalSeatsPreferential: 20, totalSeatsGeneral: 50, totalSeats: 70 },
].map((room) => ({ ...room, createdAt: new Date(), updatedAt: new Date() }));
await mongoose.connection.collection("rooms").insertMany(rooms);

// La hora local del cine se guarda marcada como UTC, igual que en producción.
const localToday = new Date(Date.now() - 5 * 60 * 60 * 1000);
const movieDocs = await mongoose.connection.collection("movies").find({ status: "billboard" }).toArray();
const sessions = [];
for (let day = 0; day < 5; day++) {
  for (const [hour, offset] of [[13, 0], [16, 1], [19, 2], [22, 0]]) {
    const dateTime = new Date(Date.UTC(localToday.getUTCFullYear(), localToday.getUTCMonth(), localToday.getUTCDate() + day, hour));
    if (dateTime <= localToday) continue;
    movieDocs.forEach((movie, index) => {
      const room = rooms[(index + offset) % rooms.length];
      if (index >= rooms.length) return;
      sessions.push({
        movieId: movie._id,
        roomId: room._id,
        dateTime,
        seatsPreferential: seatMap(room.totalSeatsPreferential),
        availableSeatsPreferential: room.totalSeatsPreferential,
        preferentialPrice: 42000,
        seatsGeneral: seatMap(room.totalSeatsGeneral),
        availableSeatsGeneral: room.totalSeatsGeneral,
        generalPrice: 30000,
        availableSeats: room.totalSeats,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    });
  }
}
await mongoose.connection.collection("sessions").insertMany(sessions);

await mongoose.connection.collection("users").insertMany(
  await Promise.all(
    [DEMO_ADMIN, DEMO_CLIENT].map(async ({ email, password, name, role }) => ({
      email,
      password: await bcrypt.hash(password, 10),
      name,
      lastName: "Demo",
      role,
      tickets: [],
      transactions: [],
      createdAt: new Date(),
      updatedAt: new Date(),
    })),
  ),
);
await mongoose.disconnect();
execFileSync(process.execPath, [path.join(root, "scripts", "seed-menu.mjs")], {
  stdio: "inherit",
  env: { ...process.env, MONGODB_URI: uri },
});
console.log(`Datos de ejemplo listos: ${movies.length} películas.`);
console.log(`Administrador de prueba: ${DEMO_ADMIN.email} / ${DEMO_ADMIN.password}`);

const next = spawn(
  process.execPath,
  [path.join(root, "node_modules", "next", "dist", "bin", "next"), "dev"],
  {
    cwd: root,
    stdio: "inherit",
    env: {
      ...process.env,
      MONGODB_URI: uri,
      JWT_SECRET: randomBytes(32).toString("hex"),
    },
  },
);

const shutdown = async () => {
  next.kill();
  await mongo.stop();
  process.exit(0);
};
process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);
next.on("exit", shutdown);
