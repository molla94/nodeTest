var express =require('express');
var router = express.Router();
var db = require('../lib/db');

router.use(express.urlencoded({
    extended: true
}));

router.get('/board/write', function (req, res) {
    res.render('board/write');
});

router.post('/board/write', function (req, res) {
    var title = req.body.title;
    var content = req.body.content;
    var writer = req.body.writer;
    var password = req.body.password;
    var data = {writer, password, content, title}
    var sql = "insert into board (idx, writer, password, content"
});