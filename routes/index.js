var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
    res.render('index', {title: 'Express'});
});

router.get('/helloworld', function(req, res) {
    res.render('helloworld', {title: 'Hello, World!'});
});

router.get('/userList', function(req, res) {
    var db = req.db;
    var collection = db.get('usercollection');
    collection.find({}, {}, function (e, docs) {
        res.render('userlist', {"userList": docs});
    });
});

/* GET New User page. */
router.get('/newuser', function(req, res) {
    res.render('new_user', { title: 'Add New User' });
});

/* POST to Add User Service */
router.post('/addUser', function(req, res) {
    // Set our internal DB variable
    var db = req.db;

    // Get our form values. These rely on the "name" attributes
    var userName = req.body.username;
    var userEmail = req.body.useremail;

    // Set our collection
    var collection = db.get('usercollection');

    // Submit to the DB
    collection.insert({
        "username" : userName,
        "email" : userEmail
    }, function (err, doc) {
        if (err) {
            // If it failed, return error
            res.send("There was a problem adding the information to the database.");
        } else {
            // If it worked, set the header so the address bar doesn't still say /adduser
            res.location("userList");
            // And forward to success page
            res.redirect("userList");
        }
    });
});

module.exports = router;
