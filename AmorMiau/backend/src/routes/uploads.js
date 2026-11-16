import { Router } from 'express';
import { exigirGestor } from '../lib/auth.js';
import { HttpError } from '../lib/http.js';
import { upload } from '../lib/upload.js';

const router = Router();

// Envie multipart/form-data com o campo "imagem".
// A resposta traz a URL para usar em fotoUrl / imagemUrl.
router.post('/', exigirGestor, upload.single('imagem'), (request, response) => {
  if (!request.file) throw new HttpError(400, 'Envie o arquivo no campo "imagem"');
  response.status(201).json({ url: `/uploads/${request.file.filename}` });
});

export default router;
