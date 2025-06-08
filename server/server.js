const express = require("express");
const cors = require("cors");
const loanRoutes = require("./routes/loans");
const authRoutes = require("./routes/auth");
const guildRoutes = require("./routes/guilds");
const session = require("express-session");

//express app
const app = express();
app.set("trust proxy", 1);

//Middleware
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(
  session({
    secret: "secret",
    resave: false,
    cookie: {
      maxAge: 60000 * 60 * 24,
      //sameSite: "none", //Comment out for local dev
      //secure: true, //Comment out for local dev
    },
    saveUninitialized: false,
  })
);


app.use((req, res, next) => {
  req.user = req.session.user;
  next();
});

//Routes
app.use("/api/loans", loanRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/guilds", guildRoutes);

app.listen(2000, () => {
  console.log("Listening on Port 2000!");
});
