// passport.js
require("dotenv").config();
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;

const callbackURL =
  process.env.NODE_ENV === "production"
    ? "https://oauth-new.onrender.com/auth/google/callback"
    : "http://localhost:3000/auth/google/callback";

passport.serializeUser((user, done) => {
  done(null, user); // store minimal user
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: callbackURL,
    },
    async (accessToken, refreshToken, profile, done) => {
      // 🔑 OAuth identity only
      const user = {
        id: profile.id,
        displayName: profile.displayName,
        email: profile.emails?.[0]?.value,
        avatar: profile.photos?.[0]?.value,
        provider: "google",
      };

      return done(null, user);
    }
  )
);

module.exports = passport;
