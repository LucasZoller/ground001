import pg from "pg"
import { config } from "../config.js"

const pool = new pg.Pool(config.db)

export const wishlistUpdate = async (request, resply) => {}
