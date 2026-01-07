require("dotenv").config();
const express = require("express");
const sessionMiddleware = require("./session");
const passport = require("./passport");

const app = express();
app.use(sessionMiddleware);

app.use(passport.initialize());
app.use(passport.session());

app.get(
  "/auth/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
  })
);

app.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/login-failed",
  }),
  (req, res) => {
    // 🔑 User is now stored in session
    res.redirect("/profile");
  }
);

app.get("/profile", (req, res) => {
  if (!req.user) {
    return res.status(401).json({ loggedIn: false });
  }

  res.json({
    status: "success",
    user: req.user,
  });
});

app.post("/logout", (req, res) => {
  req.logout(() => {
    req.session.destroy(() => {
      res.clearCookie("connect.sid");
      res.json({ success: true });
    });
  });
});

app.listen(3000, () => {
  console.log("Server started on http://localhost:3000");
});
