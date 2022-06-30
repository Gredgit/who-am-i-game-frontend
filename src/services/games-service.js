import axios from 'axios';

async function findGameById(player, id) {
  const response = await axios({
    method: 'get',
    url: `/api/v1/games/${id}`,
    headers: { 'X-Player': player },
  });

  return response;
}

async function findAvailableGames(player) {
  const response = await axios({
    method: 'get',
    url: '/api/v1/games',
    headers: { 'X-Player': player },
  });

  return response;
}

async function getAllPlayersCount(player) {
  const response = await axios({
    method: 'get',
    url: '/api/v1/games/all-players-count',
    headers: { 'X-Player': player },
  });

  return response;
}

function createGame(player, playersNum) {
  const response = axios({
    method: 'post',
    url: '/api/v1/games',
    headers: { 'X-Player': player },
    data: {
      maxPlayers: playersNum,
    },
  });

  return response;
}

function suggestCharacter(player, id, name, character) {
  axios({
    method: 'post',
    url: `/api/v1/games/${id}/characters`,
    headers: { 'X-Player': player },
    data: {
      name: name,
      character: character,
    },
  });
}

async function findTurnInfo(player, id) {
  const response = await axios({
    method: 'get',
    url: `/api/v1/games/${id}/turn`,
    headers: { 'X-Player': player },
  });

  return response;
}

function askQuestion(player, id, message) {
  axios({
    method: 'post',
    url: `/api/v1/games/${id}/questions`,
    headers: { 'X-Player': player },
    data: {
      message: message,
    },
  });
}

function submitGuess(player, id, guess) {
  axios({
    method: 'post',
    url: `/api/v1/games/${id}/guess`,
    headers: { 'X-Player': player },
    data: {
      message: guess,
    },
  });
}

function answerQuestion(player, id, question) {
  axios({
    method: 'post',
    url: `/api/v1/games/${id}/answer`,
    headers: { 'X-Player': player },
    data: {
      message: question,
    },
  });
}

function leaveGame(player, id) {
  axios({
    method: 'delete',
    url: `/api/v1/games/${id}/leave`,
    headers: { 'X-Player': player },
  });
}

export {
  findGameById,
  findAvailableGames,
  createGame,
  suggestCharacter,
  findTurnInfo,
  askQuestion,
  submitGuess,
  answerQuestion,
  getAllPlayersCount,
  leaveGame,
};
