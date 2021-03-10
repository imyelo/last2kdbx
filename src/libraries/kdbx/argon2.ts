import kdbxweb from 'kdbxweb'
// @ts-ignore
import { hash } from 'argon2-wasm-pro'

kdbxweb.CryptoEngine.argon2 = function argon2(
  password,
  salt,
  memory,
  iterations,
  length,
  parallelism,
  type,
  version
) {
  return hash({
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