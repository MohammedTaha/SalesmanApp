var express = require("express");
var Firebase = require("firebase");
var ref = new Firebase("https://saylani101.firebaseio.com/users");
var UserModel_1 = require("../DBRepo/UserModel");
var router = express.Router();
router.post("/signup", function (req, res) {
    ref.createUser({
        email: req.body.data.Email,
        password: req.body.data.Password
    }, function (err, success) {
        if (err) {
            res.send(err);
        }
        else {
            req.body.data.FirebaseToken = success.uid;
            UserModel_1.saveUser(req.body.data)
                .then(function (userInstance) {
                res.send({ status: true, user: userInstance });
            }, function (err) {
                res.send({ status: false, message: err });
            });
        }
    });
});
router.post("/login", function (req, res) {
    console.log("On Login In");
    var user = req.body.data;
    UserModel_1.findUser({ Email: user.email })
        .then(function (userInstance) {
        if (!userInstance) {
            res.send("No user found with supplied email");
            return;
        }
        if (userInstance.Password == user.password) {
            res.send({ message: "Logged In successfully", token: userInstance.FirebaseToken });
        }
        else {
            res.send("Wrong Password");
        }
    }, function (err) {
        res.send({ status: false, message: err });
    });
});
router.get("/salesmen", function (req, res) {
    console.log(req.user);
    var salesmenArr = [{ name: "S 01", id: 1 }, { name: "S 02", id: 2 }, { name: "S 03", id: 3 }];
    res.send({ status: true, data: salesmenArr });
});
module.exports = router;
