const express = require("express");

const HttpError = require("../models/http-error");

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
    throw new HttpError(
      `Cound not find a place for the provided place id: ${placeId}`,
      404
    );
  }
  console.log("GET Request in Places");
  res.json(place);
});

router.get("/user/:uid", (req, res, next) => {
  const userId = req.params.uid;
  const place = DUMMY_PLACES.find((p) => p.creator === userId);
  if (!place) {
    return next(
      new HttpError(
        `Cound not find a place for the provided user id: ${userId}`,
        404
      )
    );
  }
  console.log("GET Request in Places");
  res.json(place);
});

module.exports = router;
