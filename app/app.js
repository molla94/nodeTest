"use strict";
//express  모듈
const express = require("express");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
dotenv.config();

const app = express();


//라우팅   미들웨어를 등록해주는 메서드 루트로 들어오면 홈폴더로 보내주는 징검다리 역활? 인듯
const home = require("./src/routes/home");

//ejs 앱 세팅
app.set("views", "./src/views");
app.set("view engine", "ejs");
app.use(express.static(`${__dirname}/src/public`));
app.use(bodyParser.json());
//url을 통해 전달되는 데이터에 한글 공백 등과 같은 문자가 포함될 경우 제대로 인식되지 않는 문제 해결
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/", home);

module.exports = app;


// app.get("/", function (req, res) {
//   res.render("home/index");
// });

// app.get("/login", function (req, res) {
//   res.render("home/login");
// });



//express
// var express = require("express");
// var app = express();

// //ejs 앱 세팅
// app.set("views", __dirname + "/views");
// app.set("view engine", "ejs");

// //bootstrap
// app.use("/js", express.static(__dirname + "/node_modules/bootstrap/dist/js"));
// app.use("/css", express.static(__dirname + "/node_modules/bootstrap/dist/css"));

// app.get("/", function (req, res) {
//   res.render("index.ejs", { data: 1234 });
// });

// app.listen(3000, function () {
//   console.log("3000번 포트에서 서버가 시작되었습니다.");
// });

// const http = require("http");
// const app = http.createServer(function (req, res) {}