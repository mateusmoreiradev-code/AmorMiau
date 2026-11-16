import { mkdirSync } from 'node:fs';
import { randomUUID } from 'node:crypto';
import { extname } from 'node:path';
import { fileURLToPath } from 'node:url';
import multer from 'multer';
import { HttpError } from './http.js';

export const UPLOAD_DIR = fileURLToPath(new URL('../../uploads', import.meta.url));
mkdirSync(UPLOAD_DIR, { recursive: true });

const TIPOS_PERMITIDOS = {
  'image/jpeg': '.jpg',
  'image/png': '.png',
  'image/webp': '.webp',
  'image/gif': '.gif',
};

export const upload = multer({
  storage: multer.diskStorage({
    destination: UPLOAD_DIR,
    filename: (_req, file, cb) =>
      cb(null, `${randomUUID()}${TIPOS_PERMITIDOS[file.mimetype] ?? extname(file.originalname)}`),
  }),
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (_req, file, cb) => {
    if (TIPOS_PERMITIDOS[file.mimetype]) cb(null, true);
    else cb(new HttpError(400, 'Envie uma imagem JPG, PNG, WEBP ou GIF'));
  },
});
