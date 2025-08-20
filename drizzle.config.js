import * as dotenv from "dotenv";
dotenv.config({ path: ".env.local" });


import { defineConfig } from "drizzle-kit";

// console.log("DATABASE_URL:", process.env.DATABASE_URL); // should now print the Neon URL

export default defineConfig({
  dialect: "postgresql",
  schema: "./configs/schema.jsx", // adjust if needed
  dbCredentials: {
    url: process.env.DATABASE_URL,
  },
//   dbCredentials: {
//   url: "postgresql://neondb_owner:npg_V2wtIGZ5LPkF@ep-square-firefly-ad1h6w9t-pooler.c-2.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require",
// },

});
