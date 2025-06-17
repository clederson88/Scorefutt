const axios = require('axios');

const API_KEY = 'bd4a8a65a6f8eda7bc8ee77111237079';
const BASE_URL = 'https://v3.football.api-sports.io/fixtures';

async function obterJogosDoDia() {
  const hoje = new Date().toISOString().split('T')[0];

  const response = await axios.get(`${BASE_URL}?date=${hoje}`, {
    headers: {
      'x-apisports-key': API_KEY
    }
  });

  return response.data.response; // lista de jogos
}

async function gerarPalpitesIA() {
  const jogos = await obterJogosDoDia();

  const palpites = jogos.map(jogo => {
    const probabilidade1X2 = Math.floor(Math.random() * 100); // simulação
    const btts = Math.random() > 0.5;
    const over25 = Math.random() > 0.5;

    return {
      time_casa: jogo.teams.home.name,
      time_fora: jogo.teams.away.name,
      horario: jogo.fixture.date,
      probabilidade1X2: `${probabilidade1X2}%`,
      btts: btts ? 'Sim' : 'Não',
      over25: over25 ? 'Sim' : 'Não',
      destaque: probabilidade1X2 > 70
    };
  });

  return palpites;
}

module.exports = { gerarPalpitesIA };
