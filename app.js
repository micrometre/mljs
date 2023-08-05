const express = require('express');
const path = require('path');

const app = express();
const port = process.env.PORT || 8080;


app.set("views", path.join(__dirname, "views"))
app.set("view engine", "ejs")

app.get("/", function (req, res, next) {
  res.render("pages/index")
})


app.use(express.static(path.join(__dirname, "public")))


app.listen(port);
console.log('Server started at http://localhost:' + port);