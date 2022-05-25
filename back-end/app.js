const express = require("express");
const fileUpload = require("express-fileupload");
const app = express();
const http = require("http").Server(app);
const mongoose = require("mongoose");
const cors = require("cors");
// const image = require("./routes/image");

mongoose
  .connect("mongodb://localhost/foodTrip_Server", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
  })
  .then(() => console.log("Connected to MongoDB..."))
  .catch((err) => console.error("Could not connect to MongoDB..."));

app.use(express.static(__dirname + 'public'));
app.use(fileUpload());
app.use(cors());
app.use(express.json());

app.use('/images', express.static(__dirname + '/public/uploads'));

app.use("/users", require("./routes/users"));
app.use("/auth", require("./routes/auth"));
app.use("/recipes", require("./routes/recipes"));

const port = 4000;
http.listen(port, () => console.log(`Listening on port ${port}...`));
