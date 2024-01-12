const uuid = require("uuid").v4;

const HttpError = require("../models/http-error");

let DUMMY_PLACES = [
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

const getPlaceById = (req, res, next) => {
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
};

const getPlacesByUserId = (req, res, next) => {
  const userId = req.params.uid;
  const places = DUMMY_PLACES.filter((p) => p.creator === userId);
  if (!places || places.length === 0) {
    return next(
      new HttpError(
        `Cound not find places for the provided user id: ${userId}`,
        404
      )
    );
  }
  console.log("GET Request in Places");
  res.json(places);
};

const createPlace = (req, res, next) => {
  const { title, description, coordinates, address, creator } = req.body;
  const newPlace = {
    id: uuid(),
    title,
    description,
    location: coordinates,
    address,
    creator,
  };

  DUMMY_PLACES.push(newPlace);
  res.status(201).json(newPlace);
};

const updatePlaceById = (req, res, next) => {
  console.log("DUMMY_PLACES", DUMMY_PLACES);
  const placeId = req.params.pid;
  const place = DUMMY_PLACES.find((p) => p.id === placeId);
  if (!place) {
    return next(
      new HttpError(
        `Cound not find a place for the provided id: ${placeId}`,
        404
      )
    );
  }
  const { title, description } = req.body;

  const newPlace = {
    ...place,
  };

  if (title) {
    newPlace.title = title;
  }

  if (description) {
    newPlace.description = description;
  }

  const placeIndex = DUMMY_PLACES.findIndex((obj) => obj.id == placeId);
  DUMMY_PLACES[placeIndex] = newPlace;
  console.log("Updated DUMMY_PLACES", DUMMY_PLACES);
  res.status(201).json(newPlace);
};

const deletePlaceById = (req, res, next) => {
  console.log("DUMMY_PLACES", DUMMY_PLACES);
  const placeId = req.params.pid;
  const place = DUMMY_PLACES.find((p) => p.id === placeId);
  if (!place) {
    return next(
      new HttpError(
        `Cound not find a place for the provided id: ${placeId}`,
        404
      )
    );
  }
  DUMMY_PLACES = DUMMY_PLACES.filter((p) => p.id !== placeId);
  console.log("Updated DUMMY_PLACES", DUMMY_PLACES);
  res.status(200).json(place);
};

module.exports = {
  getPlaceById,
  getPlacesByUserId,
  createPlace,
  updatePlaceById,
  deletePlaceById,
};
