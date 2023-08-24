import { EOL } from 'os';
import * as mime from 'mime-types';
import { MIMEMessage } from '../MIMEMessage.js';

const envctx = {
  toBase64: function toBase64(data: string) {
    return Buffer.from(data).toString('base64');
  },
  toBase64WebSafe: function toBase64WebSafe(data: string) {
    return Buffer.from(data)
      .toString('base64')
      .replace(/\+/g, '-')
      .replace(/\//g, '_')
      .replace(/=+$/, '');
  },
  eol: EOL,
  validateContentType: (v: string): string | false => {
    return mime.contentType(v);
  }
};

export function createMimeMessage(): MIMEMessage {
  return new MIMEMessage(envctx);
}

export { MIMEMessage } from '../MIMEMessage.js';
export { Mailbox } from '../Mailbox.js';
export { MIMETextError } from '../MIMETextError.js';
export { MIMEMessageHeader } from '../MIMEMessageHeader.js';
export { MIMEMessageContent } from '../MIMEMessageContent.js';
