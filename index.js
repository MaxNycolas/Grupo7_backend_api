const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('API do monitoramento está rodando!');
});

app.use('/api/medicoes', require('./Routes/medicoes'));
app.use('/api/alertas', require('./Routes/alertas'));

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
