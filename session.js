// session.js
const session = require("express-session");

module.exports = session({
  secret: "dev-secret",
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    secure: false,     // true in prod (HTTPS)
    sameSite: "lax",
  },
});
