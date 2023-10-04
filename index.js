/*  Programmer:   labthe3rd
 *  date:         10/04/23
 *  desc:         Allows user to upload file to api then returns metadata in json response
 *  note:         This code was created to get my backend api cert from freecodecamp. Feel free to use as you wish
 */

var express = require("express");
var cors = require("cors");
require("dotenv").config();

var app = express();

app.use(cors());
app.use("/public", express.static(process.cwd() + "/public"));

//Define multer to parse the form data in the api request
const multer = require("multer");
const upload = multer();

app.get("/", function (req, res) {
  res.sendFile(process.cwd() + "/views/index.html");
});

//Use upload.single() with the form name 'upfile' to get a single file from a from
app.post("/api/fileanalyse", upload.single("upfile"), function (req, res) {
  console.log(req.file);

  return res.json({
    name: req.file.originalname,
    type: req.file.mimetype,
    size: req.file.size,
  });
});

const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log("Your app is listening on port " + port);
});
