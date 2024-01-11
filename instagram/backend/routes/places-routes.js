const express = require("express");

const router = express.Router();

const DUMMY_PLACES = [
  {
    id: "p1",
    title: "Nis Fortress",
    description:
      "It is a complex and important cultural and historical monument.",
    location: {
      lat: 123.456,
      lng: 789.123,
    },
    address: "Nis",
    creator: "u1",
  },
];

router.get("/:pid", (req, res, next) => {
  const placeId = req.params.pid;
  const place = DUMMY_PLACES.find((p) => p.id === placeId);
  if (!place) {
    res.status(404);
    throw new Error("No place found!");
  }
  console.log("GET Request in Places");
  res.json(place);
});

module.exports = router;
