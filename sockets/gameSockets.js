const games = require("../data/games");

const gameSockets = (socket, io) => {
  socket.on("join-game", ({ gameId, playerId }) => {
    if (games[gameId] && games[gameId].players[playerId]) {
      games[gameId].players[playerId].isConnected = true;
      io.emit(`update-game-${gameId}`, games[gameId]);
    }
  });

  socket.on("leave-game", ({ gameId, playerId, msg }) => {
    console.log("leave-game triggered", gameId, playerId, msg);
    if (games[gameId] && games[gameId].players[playerId]) {
      games[gameId].players[playerId].isConnected = false;
      io.emit(`update-game-${gameId}`, games[gameId]);
    }
  });

  socket.on("disconnect", (reason) => {
    console.log("disconnect", socket.id);
  });
};

module.exports = { gameSockets };
