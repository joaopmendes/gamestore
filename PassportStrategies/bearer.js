// const BearerStrategy = require("passport-http-bearer").Strategy;
// const User = require("../Models/User");
// module.exports = (passport) => {
//   passport.use(
//     new BearerStrategy((token, done) => {
//       User.findOne({ token }, (err, user) => {
//         if (err) {
//           return done(err);
//         }
//         if (!user) {
//           return done(null, false);
//         }
//         return done(null, user);
//       });
//     })
//   );
// };
