// api/visits.js — Vercel Serverless Function
// Contador de visitas usando Vercel KV (Redis gratis)
// Requiere: vercel kv (se activa en el dashboard de Vercel, tier gratis)

import { kv } from '@vercel/kv';

export default async function handler(req, res) {
  // CORS para que el HTML pueda llamarlo
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    // Incrementa el contador y devuelve el nuevo valor
    const count = await kv.incr('emiliano_minecraft_visits');
    return res.status(200).json({ count, ok: true });
  } catch (err) {
    console.error('KV error:', err);
    return res.status(500).json({ count: 0, ok: false, error: err.message });
  }
}
