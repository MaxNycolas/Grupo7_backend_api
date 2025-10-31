const express = require('express');
const router = express.Router();
const db = require('../db');

// ===================================================================
// POST - salvar uma medição
// ===================================================================
router.post('/', (req, res) => {
  const {
    device_id,
    corrente,
    tensao,
    potencia,
    energia,
    frequencia,
    fator_potencia
  } = req.body;

  const query = `
    INSERT INTO medicoes 
      (device_id, corrente, tensao, potencia, energia, frequencia, fator_potencia)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `;

  db.query(
    query,
    [device_id, corrente, tensao, potencia, energia, frequencia, fator_potencia],
    (err) => {
      if (err) return res.status(500).json({ error: err });
      res.status(201).json({ status: 'Medição registrada com sucesso' });
    }
  );
});

// ===================================================================
// GET - listar últimas medições (normal)
// ===================================================================
router.get('/', (req, res) => {
  const query = 'SELECT * FROM medicoes ORDER BY data_hora DESC';
  db.query(query, (err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.json(results);
  });
});

// ===================================================================
// GET - exportar todas as medições em JSON (download de arquivo)
// ===================================================================
router.get('/export', (req, res) => {
  const query = 'SELECT * FROM medicoes ORDER BY data_hora DESC';

  db.query(query, (err, results) => {
    if (err) return res.status(500).json({ error: err });

    // Cabeçalhos para forçar o download do arquivo JSON
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Content-Disposition', 'attachment; filename="medicoes.json"');

    // Envia o JSON formatado
    res.send(JSON.stringify(results, null, 2));
  });
});

module.exports = router;






