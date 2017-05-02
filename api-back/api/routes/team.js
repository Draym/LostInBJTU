var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var async = require("async");

var Team = require('../models/Team.js');


router.delete('/', function (req, res, next) {
    console.log(req.query);
    Team.findByIdAndRemove(req.query.id, function (err) {
        if (err) {
            res.send({success: false, message: 'Internal error', errcode: 7});
        }
        else {
            res.send({success: true});
        }
    });
});

router.put('/', function (req, res, next) {
    Team.findByIdAndUpdate(req.body._id, req.body, function (err) {
        if (err) {
            res.send({success: false, message: 'No team find', errcode: 4});
        }
        else {
            res.send({success: true});
        }
    });
});

router.get('/', function (req, res, next) {
    Team.find(function (err, teams) {
        if (err) {
            res.send({success: false, message: 'Internal Error', errcode: 0});
        }
        else {
            res.send({success: true, 'teams': teams});
        }
    });
});

router.post('/', function (req, res, next) {
    var team = new Team({
        teamName: req.body.teamName,
        projectName: req.body.projectName,
        members: req.body.members,
        rating: req.body.rating
    });

    team.save(function (err) {
        if (err) {
            res.send({success: false});
        } else {
            res.send({success: true});
        }
    });
});

module.exports = router;
