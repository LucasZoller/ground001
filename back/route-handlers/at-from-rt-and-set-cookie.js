import pg from "pg"
import { config } from "../config.js"
import { V4 } from "paseto"
import argon2 from "argon2"
import { generateMaxAgeAndTimestampInMsFromPasetoTokenHelper } from "../helpers/tokenHelpers.js"
const pool = new pg.Pool(config.db)

export const atFromRtCookie = async (request, reply) => {
  reply
    .code(200)
    .send({ val1: "hello this is val1!", val2: "Bye this is val2!" })
}
