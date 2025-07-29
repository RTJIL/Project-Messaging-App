import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import fs from 'node:fs/promises'

const __dirname = dirname(fileURLToPath(import.meta.url))

export const PRIV_KEY = await fs.readFile(
  join(__dirname, '../keys/private.pem')
)
export const PUB_KEY = await fs.readFile(join(__dirname, '../keys/public.pem'))
