const express = require('express');
const router = express.Router();
const db = require('../db');

// POST - salvar uma medição
router.post('/', (req, res) => {
  const {
    device_id, corrente, tensao, potencia,
    energia, frequencia, fator_potencia
  } = req.body;

  const query = `INSERT INTO medicoes 
    (device_id, corrente, tensao, potencia, energia, frequencia, fator_potencia)
    VALUES (?, ?, ?, ?, ?, ?, ?)`;

  db.query(query, [device_id, corrente, tensao, potencia, energia, frequencia, fator_potencia], (err) => {
    if (err) return res.status(500).json({ error: err });
    res.status(201).json({ status: 'Medição registrada com sucesso' });
  });
});

// GET - exportar todas as medições em JSON
router.get('/export', (req, res) => {
  const query = 'SELECT * FROM medicoes ORDER BY data_hora DESC';

  db.query(query, (err, results) => {
    if (err) return res.status(500).json({ error: err });

    // Cabeçalhos para forçar o download
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Content-Disposition', 'attachment; filename="medicoes.json"');

    // Envia os dados completos como arquivo
    res.send(JSON.stringify(results, null, 2));
  });
});




