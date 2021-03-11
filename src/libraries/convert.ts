import _ from 'underscore'
import Debug from 'debug'
import { Buffer } from "buffer"
import Papa from "papaparse"
import kdbxweb from "kdbxweb"
import './kdbx/argon2'

const PROTECTED_VALUE = ''

const debug = Debug('app')

interface Source {
  url: string;
  username: string;
  password: string;
  extra: string;
  name: string;
  grouping: string;
  fav: 0 | 1;
}

export const convert = async (input: Buffer): Promise<Buffer> => {
  const sourceSheet = Papa.parse<Source>(input.toString("utf8").trim(), { header: true })
  debug(sourceSheet)

  const credential = new kdbxweb.Credentials(kdbxweb.ProtectedValue.fromString(PROTECTED_VALUE), null)
  const db = await kdbxweb.Kdbx.create(credential, 'My new db')

  const groupNames = _.uniq(sourceSheet.data?.map((source) => source.grouping))
  const groups = _.object(groupNames.map((name) => [name, db.createGroup(db.getDefaultGroup(), name)] as const))

  sourceSheet.data?.forEach((source) => {
    const entry = db.createEntry(groups[source.grouping])
    entry.fields.Title = source.name
    entry.fields.UserName = source.username
    entry.fields.Password = source.password
    entry.fields.URL = source.url
    entry.fields.Note = source.extra
    entry.pushHistory()
  })
  debug(db)
  const buffer = await db.save()
  debug(buffer)

  return Promise.resolve(Buffer.from(buffer))
}

export const inspect = async (input: Buffer): Promise<Buffer> => {
  const credential = new kdbxweb.Credentials(kdbxweb.ProtectedValue.fromString(PROTECTED_VALUE), null)
  const db = await kdbxweb.Kdbx.load(input.buffer, credential)
  debug(db)
  return input
}
