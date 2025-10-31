const express = require('express');
const router = express.Router();
const db = require('../db');

// GET - listar alertas
router.get('/', (req, res) => {
  db.query('SELECT * FROM alertas ORDER BY data_hora DESC', (err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.json(results);
  });
});

// POST - salvar alerta vindo da IA
router.post('/', (req, res) => {
  const { device_id, mensagem_ia } = req.body;

  db.query('INSERT INTO alertas (device_id, mensagem_ia) VALUES (?, ?)', [device_id, mensagem_ia], (err) => {
    if (err) return res.status(500).json({ error: err });
    res.status(201).json({ status: 'Alerta registrado com sucesso' });
  });
});

module.exports = router;

