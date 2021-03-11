import kdbxweb from 'kdbxweb'
// @ts-ignore
import argon2 from 'argon2-wasm-esm'

kdbxweb.CryptoEngine.argon2 = async (
  password,
  salt,
  memory,
  iterations,
  length,
  parallelism,
  type,
  version
) => {
  return argon2.hash({
    pass: new Uint8Array(password),
    salt: new Uint8Array(salt),
    time: iterations,
    mem: memory,
    hashLen: length,
    parallelism,
    type,
    version,
  }).then(({ hash }: { hash: Uint8Array }) => hash)
}