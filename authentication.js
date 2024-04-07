const user = require("./models/user.models");

const initilizationPassport = (passport, localStrategy) => {
  passport.use(
    new localStrategy(async (username, password, done) => {
      const User = await user.findOne({ username });

      if (!User) {
        return done(null, false);
      }
      if (password !== User.password) {
        return done(null, false);
      }

      return done(null, User);
    })
  );
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser(async (id, done) => {
    const User = await user.findById(id);
    done(null, User);
  });
};

module.exports = initilizationPassport;
