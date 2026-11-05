// Crea un administrador, o da ese rol a un usuario que ya existe.
// Define MONGODB_URI, ADMIN_EMAIL, ADMIN_PASSWORD, ADMIN_NAME y ADMIN_LAST_NAME
// en .env.local y corre: npm run create-admin
// Después borra ADMIN_PASSWORD de ese archivo.
import bcrypt from "bcryptjs";
import mongoose from "mongoose";

const {
  MONGODB_URI,
  ADMIN_EMAIL,
  ADMIN_PASSWORD,
  ADMIN_NAME = "Admin",
  ADMIN_LAST_NAME = "MovieSeat",
} = process.env;

if (!MONGODB_URI || !ADMIN_EMAIL) {
  console.error("Faltan MONGODB_URI o ADMIN_EMAIL en .env.local");
  process.exit(1);
}

const email = ADMIN_EMAIL.trim().toLowerCase();

await mongoose.connect(MONGODB_URI);
const users = mongoose.connection.collection("users");
const existing = await users.findOne({ email });

if (existing) {
  await users.updateOne(
    { _id: existing._id },
    { $set: { role: "admin", updatedAt: new Date() } },
  );
  console.log(`${email} ahora es administrador. Su contraseña no cambió.`);
} else {
  if (!ADMIN_PASSWORD || ADMIN_PASSWORD.length < 8) {
    console.error("ADMIN_PASSWORD debe tener al menos 8 caracteres.");
    await mongoose.disconnect();
    process.exit(1);
  }
  await users.insertOne({
    email,
    password: await bcrypt.hash(ADMIN_PASSWORD, 10),
    name: ADMIN_NAME,
    lastName: ADMIN_LAST_NAME,
    role: "admin",
    tickets: [],
    transactions: [],
    createdAt: new Date(),
    updatedAt: new Date(),
  });
  console.log(`Administrador ${email} creado.`);
}

await mongoose.disconnect();
