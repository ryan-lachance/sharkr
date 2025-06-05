const express = require("express");

const router = express.Router();

router.get("/", (req, res) => {
  const dummyUser = {
    id: "123456789",
    username: "dummyuser",
    displayname: "Dummy User",
    guilds: [
      {
        id: "guild1",
        name: "Guild One",
        members: [
          {
            id: "123456789",
            username: "dummyuser",
            displayname: "Dummy User",
            bot: false,
          },
          {
            id: "987654321",
            username: "otheruser",
            displayname: "Other User",
            bot: false,
          },
        ],
      },
      {
        id: "guild2",
        name: "Guild Two",
        members: [
          {
            id: "123456789",
            username: "dummyuser",
            displayname: "Dummy User",
            bot: false,
          },
        ],
      },
    ],
  };
  req.session.user = dummyUser;
  res.redirect("http://localhost:5173");
});

router.get("/status", (req, res) => {
if (req.session.user) {
    res.json({ isAuthenticated: true, user: req.session.user });
  } else {
    res.json({ isAuthenticated: false });
  }
});

router.get("/logout", (req, res) => {
  req.session.destroy(() => {
    res.redirect("http://localhost:5173");
  });
});

module.exports = router;
