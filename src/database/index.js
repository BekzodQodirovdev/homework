import knex from "knex"
import { config } from "dotenv"
import database from "../../knexfile.js";
config()

export const db = knex(database.development)
