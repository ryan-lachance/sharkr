require("dotenv").config();
const env = process.env;
const express = require("express");
const passport = require("passport");

const router = express.Router();

router.get("/", passport.authenticate("discord"));
router.get(
  "/redirect",
  passport.authenticate("discord", {
    failureRedirect: env.CLIENT_URL,
  }),
  (req, res) => {
    res.redirect(env.CLIENT_URL);
  }
);

router.get("/status", (req, res) => {
  if (req.isAuthenticated()) {
    res.json({ isAuthenticated: true, user: req.user });
  } else {
    res.json({ isAuthenticated: false });
  }
});

router.get("/logout", (req, res, next) => {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    req.session.destroy(() => {
      res.redirect(env.CLIENT_URL);
    });
  });
});

module.exports = router;
