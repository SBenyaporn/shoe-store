// scripts/seedImagesFromFolders.js
import fs from "fs";
import path from "path";
import mysql from "mysql2/promise";

const DB = {
  host: process.env.DB_HOST || "127.0.0.1",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASS || "",
  database: process.env.DB_NAME || "Shoestore", 
};

const FOLDERS = [
  "/Users/wipawach/Downloads/ShoeStore2-5/my-app/public/assets/Shop",
  
];


const ALLOWED_EXT = new Set([".webp", ".png", ".jpg", ".jpeg", ".avif"]);


function extToMime(ext) {
  const e = ext.toLowerCase();
  if (e === ".png") return "image/png";
  if (e === ".jpg" || e === ".jpeg") return "image/jpeg";
  if (e === ".webp") return "image/webp";
  if (e === ".avif") return "image/avif";
  return "application/octet-stream";
}


const DEFAULT_PRODUCT_ID = 1; 
const productIdMap = {
  
  "2.2.webp":  5,
  "2.4.webp":  3,
  "2.5.webp":  2,
  "2.6.webp":  6,
  "2.7.webp":  13, 
  "6.1.webp":  4,
  "6.2.webp":  1,
  "6.3.avif": 12,
  "6.4.webp":  7,
  "6.5.webp":  8,
  "6.6.webp":  9,
  "6.7.avif": 10,
  "6.8.png":  11,


  "1.2.webp": 14,
  "1.png":    15,
  "2.webp":   16,
  "3.webp":   17,
  "4.jpg":    18,
};

async function main() {
  const conn = await mysql.createConnection(DB);
  try {
    console.log("Connected to DB:", DB.database);

    const [existRows] = await conn.execute(
      "SELECT filename FROM product_images"
    );
    const existing = new Set(existRows.map(r => r.filename));

    let inserted = 0, skipped = 0, missing = 0;

    for (const folder of FOLDERS) {
      if (!fs.existsSync(folder)) {
        console.warn("SKIP folder (not found):", folder);
        continue;
      }
      const names = fs.readdirSync(folder);
      for (const name of names) {
        const ext = path.extname(name);
        if (!ALLOWED_EXT.has(ext.toLowerCase())) continue;

        if (existing.has(name)) {
          skipped++;
          continue;
        }

        const full = path.join(folder, name);
        try {
          const buf = fs.readFileSync(full);
          const mime = extToMime(ext);
          const productId = productIdMap[name] ?? DEFAULT_PRODUCT_ID;

          if (!productId) {
            console.warn("NO PRODUCT_ID for", name);
            missing++;
            continue;
          }

          const [res] = await conn.execute(
            `INSERT INTO product_images
             (product_id, filename, mime_type, size_bytes, is_primary, image_blob)
             VALUES (?, ?, ?, ?, ?, ?)`,
            [productId, name, mime, buf.length, 1, buf]
          );
          inserted++;
          console.log(`+ Inserted #${res.insertId} : ${name} -> product_id=${productId}`);
        } catch (e) {
          console.error("ERR insert", name, e.message);
        }
      }
    }

    console.log(`\nDone. inserted=${inserted}, skipped=${skipped}, missing-productId=${missing}`);
  } finally {
    await conn.end();
  }
}

main().catch(e => {
  console.error(e);
  process.exit(1);
});
