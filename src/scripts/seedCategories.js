const mongoose = require("mongoose");
const path = require("path");
require("dotenv").config();

const Category = require("../models/Category").default;

const { categories } = require(path.join(
  __dirname,
  "../constants/constants.js"
));

const slugify = (text) =>
  text
    .toString()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^\w\-]+/g, "")
    .replace(/\-\-+/g, "-");

async function seed() {
  try {
    const uri = process.env.MONGODB_URI;
    if (!uri) throw new Error("Falta MONGODB_URI");

    await mongoose.connect(uri);
    console.log("✅ Conectado a MongoDB");

    for (const cat of categories) {
      const slug = slugify(cat.name);
      await Category.updateOne(
        { slug },
        { ...cat, slug },
        { upsert: true, setDefaultsOnInsert: true }
      );
      console.log(`✅ Insertada: ${cat.name}`);
    }

    console.log("🏁 Todas las categorías procesadas");
    process.exit(0);
  } catch (err) {
    console.error("❌ Error al sembrar categorías:", err);
    process.exit(1);
  }
}

seed();
