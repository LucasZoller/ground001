import ms from "ms"
import { argon2id } from "argon2"

// Validate and load all required environment variables
const {
  USER,
  PASS,
  HOST,
  DB,
  DBPORT,
  ARGON2_MEMORY_COST,
  ARGON2_TIME_COST,
  ARGON2_PARALLELISM,
  PASETO_SECRET_KEY_AT,
  PASETO_SECRET_KEY_RT,
  PASETO_PUBLIC_KEY_AT,
  PASETO_PUBLIC_KEY_RT,
  RT_EXPIRATION,
  AT_EXPIRATION,
  AUTH_GUARD_HASH_AT,
  AUTH_GUARD_HASH_RT
} = process.env

// Centralized environment variable validation
if (
  !USER ||
  !PASS ||
  !HOST ||
  !DB ||
  !DBPORT ||
  !ARGON2_MEMORY_COST ||
  !ARGON2_TIME_COST ||
  !ARGON2_PARALLELISM ||
  !PASETO_SECRET_KEY_AT ||
  !PASETO_SECRET_KEY_RT ||
  !PASETO_PUBLIC_KEY_AT ||
  !PASETO_PUBLIC_KEY_RT ||
  !RT_EXPIRATION ||
  !AT_EXPIRATION ||
  !AUTH_GUARD_HASH_AT ||
  !AUTH_GUARD_HASH_RT
) {
  throw new Error("ERR_MISSING_ENVIRONMENT_VARIABLES")
}

// Export configuration values as a single object
export const config = {
  db: {
    user: USER,
    password: PASS,
    host: HOST,
    database: DB,
    port: parseInt(DBPORT, 10) // Ensure port is an integer
  },
  argon2: {
    type: argon2id,
    memoryCost: parseInt(ARGON2_MEMORY_COST, 10),
    timeCost: parseInt(ARGON2_TIME_COST, 10),
    parallelism: parseInt(ARGON2_PARALLELISM, 10)
  },
  pasetoKeys: {
    secret: {
      // For sign()
      at: PASETO_SECRET_KEY_AT,
      rt: PASETO_SECRET_KEY_RT
    },
    public: {
      // For verify()
      at: PASETO_PUBLIC_KEY_AT,
      rt: PASETO_PUBLIC_KEY_RT
    }
  },
  expiration: {
    // For Paseto usage
    paseto: {
      rt: RT_EXPIRATION, // e.g., "72 hours"
      at: AT_EXPIRATION // e.g., "5 seconds"
    }
  },
  // For authUser middleware plugin,
  guardHash: {
    at: AUTH_GUARD_HASH_AT,
    rt: AUTH_GUARD_HASH_RT
  }
}
