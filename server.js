
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const axios = require('axios');
const bodyParser = require('body-parser');

dotenv.config();
const app = express();
app.use(cors());
app.use(bodyParser.json());

const USERS = [
  { email: 'admin@scorefut.com', senha: '1234', tipo: 'adm' },
  { email: 'cliente@scorefut.com', senha: '1234', tipo: 'cliente' }
];

app.post('/login', (req, res) => {
  const { email, senha } = req.body;
  const user = USERS.find(u => u.email === email && u.senha === senha);
  if (user) {
    res.json({ success: true, tipo: user.tipo });
  } else {
    res.status(401).json({ success: false });
  }
});

app.get('/jogos', async (req, res) => {
  const hoje = new Date().toISOString().slice(0, 10);
  const url = `https://v3.football.api-sports.io/fixtures?date=${hoje}`;
  try {
    const response = await axios.get(url, {
      headers: { 'x-apisports-key': process.env.API_KEY }
    });

    const resultados = response.data.response.map(jogo => {
      return {
        casa: jogo.teams.home.name,
        fora: jogo.teams.away.name,
        porcentagem: {
          casa: Math.floor(Math.random() * 100),
          empate: Math.floor(Math.random() * 100),
          fora: Math.floor(Math.random() * 100),
          ambos: Math.floor(Math.random() * 100),
          mais_25: Math.floor(Math.random() * 100)
        }
      };
    });

    res.json(resultados);
  } catch (e) {
    res.status(500).json({ error: 'Erro ao buscar dados da API' });
  }
});

app.listen(3000, () => console.log('Servidor rodando na porta 3000'));
