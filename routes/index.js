var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
    res.render('index', {title: 'Express'});
});

router.get('/helloworld', function(req, res) {
    res.render('helloworld', {title: 'Hello, World!'});
});

module.exports = router;
