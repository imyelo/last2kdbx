import { Buffer } from 'buffer';

export const convertArrayBufferToBuffer = (ab: ArrayBuffer): Buffer => {
  const buffer = Buffer.alloc(ab?.byteLength);
  const view = new Uint8Array(ab);
  for (let i = 0; i < buffer.length; i++) {
    buffer[i] = view[i];
  }
  return buffer;
};