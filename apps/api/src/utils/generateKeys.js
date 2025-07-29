import crypto from 'node:crypto'
import fs from 'node:fs/promises'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))

const keysDir = join(__dirname, '../keys')
const privatePath = join(keysDir, 'private.pem')
const publicPath = join(keysDir, 'public.pem')

async function genKeyPair() {
  try {
    await fs.access(privatePath)
    await fs.access(publicPath)
    console.log('✅ Keys already exist. Skipping generation.')
    return
  } catch (err) {
    const { privateKey, publicKey } = crypto.generateKeyPairSync('rsa', {
      modulusLength: 2048,
      publicKeyEncoding: {
        type: 'pkcs1',
        format: 'pem',
      },
      privateKeyEncoding: {
        type: 'pkcs1',
        format: 'pem',
      },
    })

    await fs.mkdir(keysDir, { recursive: true })
    await fs.writeFile(privatePath, privateKey)
    await fs.writeFile(publicPath, publicKey)

    console.log('🔑 Keys generated and saved in /keys folder!')
  }
}

genKeyPair()
