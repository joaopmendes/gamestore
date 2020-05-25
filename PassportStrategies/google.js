// const BearerStrategy = require("passport-http-bearer").Strategy;
const User = require("../Models/User");
var GoogleStrategy = require("passport-google-oauth20");

module.exports = (passport) => {
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.CONSUMER_KEY,
        clientSecret: process.env.CONSUMER_SECRET,
        callbackURL: process.env.GOOGLE_CALLBACK,
      },
      function (accessToken, refreshToken, profile, done) {
        console.log("profile", profile);
        User.findOrCreate({ googleId: profile.id }, function (err, user) {
          user.name = profile.username;
          // user.email = profile.emails;
          user.accessToken = accessToken;
          return done(err, user);
        });
      }
    )
  );
};
