const express = require("express");
const router = express.Router();
const cartas = require("../data/cards.js");

router.get("/", (req, res) => {
  console.log("/cartas triggered");
  const ids = req.query.ids.split(","); // Separar los IDs por comas
  const cartasSolicitadas = [];
  let idsNoEncontrados = [];

  ids.forEach((id) => {
    if (cartas.hasOwnProperty(id)) {
      cartasSolicitadas.push(cartas[id]);
    } else {
      idsNoEncontrados.push(id);
    }
  });

  if (cartasSolicitadas.length === ids.length) {
    res.json(cartasSolicitadas);
  } else {
    if (ids.length !== idsNoEncontrados.length) {
      res
        .status(404)
        .send(
          `No se encontraron las cartas con los siguientes IDs: ${idsNoEncontrados.join(
            ", "
          )}`
        );
    } else {
      console.log("todas las ids malas");
      res.status(404).send("No se encontraron cartas con esos IDs");
    }
  }
});

router.get("/buscar", (req, res) => {
  const nombreBuscado = req.query.nombre.toLowerCase();

  const cartasFiltradas = [];
  Object.keys(cartas).forEach((id) => {
    const carta = cartas[id];
    if (carta.Romaji.toLowerCase().includes(nombreBuscado)) {
      cartasFiltradas.push(carta);
    }
  });

  res.json(cartasFiltradas);
});

module.exports = router;
