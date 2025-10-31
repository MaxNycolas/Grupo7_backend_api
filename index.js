const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Permitir requisições grandes (até 100 MB)
app.use(express.json({ limit: '100mb' }));
app.use(express.urlencoded({ limit: '100mb', extended: true }));

// Habilitar CORS
app.use(cors());

// Rota base (teste rápido)
app.get('/', (req, res) => {
  res.send('API do monitoramento está rodando!');
});

// Rotas principais
app.use('/api/medicoes', require('./routes/medicoes'));
app.use('/api/alertas', require('./routes/alertas'));

// Inicialização do servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});



