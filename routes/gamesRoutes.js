const express = require("express");
const router = express.Router();
const games = require("../data/games");

const strToSlug = (str) =>
  str
    .toLowerCase()
    .replace(/ /g, "-")
    .replace(/[^\w-]+/g, "");

const createUnicSlug = (name) => {
  let slug = strToSlug(name);
  let uniqueSlug = slug;
  let counter = 1;

  while (Object.keys(games).includes(uniqueSlug)) {
    uniqueSlug = `${slug}-${counter}`;
    counter++;
  }

  return uniqueSlug;
};

// CREATE NEW GAME

router.post("/", (req, res) => {
  const { name, players } = req.body;
  const id = createUnicSlug(name);

  if (!name || !players) {
    return res.status(400).send("Incluye todos los campos");
  }

  const formattedPlayers = {};

  players.map((player) => {
    formattedPlayers[player] = {
      socketId: "",
      isConnected: false,
      name: player,
      playedCards: {},
    };
  });

  const newGame = {
    id,
    name,
    createdAt: Date.now(),
    players: formattedPlayers,
  };

  games[id] = newGame;

  res.status(201).json(newGame);
});

// GET GAME BY ID
router.get("/:id", (req, res) => {
  const id = req.params.id;

  if (games[id]) {
    res.json(games[id]);
  } else {
    res.status(404).send("Juego no encontrado");
  }
});

// SEARCH GAMES BY NAME
router.get("/buscar", (req, res) => {
  const searchedNamed = req.query.nombre.toLowerCase();

  const filteredGames = [];
  Object.keys(games).forEach((id) => {
    const game = games[id];
    if (game.Romaji.toLowerCase().includes(searchedNamed)) {
      gamesFiltradas.push(game);
    }
  });

  res.json(filteredGames);
});

module.exports = router;
