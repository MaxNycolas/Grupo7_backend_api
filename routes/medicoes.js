const express = require('express');
const router = express.Router();
const db = require('../db');

// POST - salvar uma medição (Nenhuma alteração)
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
            if (err) return res.status(500).json({ error: err.message });
            res.status(201).json({ status: 'Medição registrada com sucesso' });
        }
    );
});

// ----------------------------------------------------------------------
// ✅ GET - LISTAR MEDIÇÕES COM FILTRO DE DATA
// ----------------------------------------------------------------------
router.get('/', (req, res) => {
    // 1. Captura dos parâmetros do query string
    const { start_date, end_date } = req.query;

    let query = "SELECT * FROM medicoes";
    const values = [];
    const conditions = [];

    // 2. Constrói a cláusula WHERE dinamicamente
    
    // Filtro pela data de início
    if (start_date) {
        // data_hora >= 'YYYY-MM-DD 00:00:00'
        conditions.push("data_hora >= ?");
        // Adiciona a string formatada ao array de valores para execução segura
        values.push(`${start_date} 00:00:00`); 
    }

    // Filtro pela data de fim
    if (end_date) {
        // data_hora <= 'YYYY-MM-DD 23:59:59'
        conditions.push("data_hora <= ?");
        values.push(`${end_date} 23:59:59`); 
    }

    // Se houver condições, adiciona 'WHERE' à consulta
    if (conditions.length > 0) {
        query += " WHERE " + conditions.join(" AND ");
    }
    
    // 3. Adiciona a ordenação final
    query += " ORDER BY data_hora DESC";
    
    // 4. Executa a consulta
    db.query(query, values, (err, results) => {
        if (err) {
            console.error("Erro ao listar medições com filtro:", err);
            return res.status(500).json({ error: err.message });
        }
        res.json(results);
    });
});

module.exports = router;





