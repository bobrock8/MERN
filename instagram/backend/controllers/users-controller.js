const uuid = require("uuid").v4;

const HttpError = require("../models/http-error");

const DUMMY_USERS = [
  {
    id: "u1",
    name: "Aca",
    email: "test@aca.com",
    password: "123",
  },
];

const getUsers = (req, res, next) => {
  res.status(200).json(DUMMY_USERS);
};

const signup = (req, res, next) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return next(new HttpError("There is a missing user data", 422));
  }

  const hasUser = DUMMY_USERS.find((u) => u.email === email);

  if (hasUser) {
    return next(
      new HttpError(`User with e-mail: ${email} already exists`, 422)
    );
  }

  const newUser = {
    id: uuid(),
    name,
    email,
    password,
  };

  DUMMY_USERS.push(newUser);
  res.status(201).json(newUser);
};

const login = (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return next(new HttpError("There is a missing user data", 404));
  }

  const user = DUMMY_USERS.find(
    (u) => u.email === email && u.password === password
  );
  if (!user) {
    return next(new HttpError("Invalid credentials", 401));
  }

  res.status(200).json(user);
};

module.exports = {
  getUsers,
  signup,
  login,
};
