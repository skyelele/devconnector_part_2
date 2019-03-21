const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
// Passport is the main authentication module
const passport = require("passport");

const users = require("./routes/api/users");
const profile = require("./routes/api/profile");
const posts = require("./routes/api/posts");

const app = express();

// Body parser middleware
//// Can now access any req.body components
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// DB Config
const db = require("./config/keys").mongoURI;

// Connect to MongoDB
mongoose
  .connect(db)
  .then(() => console.log("MONGODB CONNECTED YO"))
  .catch(err => console.log(err));

// Passport middleware
app.use(passport.initialize());

// Passport Config
//// JWT strategy
require("./config/passport")(passport);

// User Routes
app.use("/api/users", users);
app.use("/api/profile", profile);
app.use("/api/posts", posts);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server running on port ${port}`));
