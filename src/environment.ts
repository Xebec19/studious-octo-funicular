import * as de from "dotenv";
const dotenv = de.config();
if (dotenv.error) {
  console.error("Error occurred while setting dot env files : ", dotenv.error);
}
export const dbUser = process.env.DB_USER;
export const dbHost = process.env.DB_HOST;
export const dbDatabase = process.env.DB_DATABASE;
export const dbPort = process.env.DB_PORT;
export const dbPassword = process.env.DB_PASSWORD;
export const jwtSecret = process.env.JWT_SECRET;
