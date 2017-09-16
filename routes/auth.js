const express = require('express');
      router = express.Router();
      mongoose = require('mongoose'),
      passport = require('passport'),
      bodyParser = require('body-parser'),
      user = require('../models/user');

/* user registration */
router.post('/signup', (req, res)=> {
            user.register(
              new user({
                  username: req.body.username,
                  userType: req.body.userType,
                  joinedAt: new Date()

              }), req.body.password,
              function(err, users) {
                  if (!err) {
                            passport.authenticate('local')(req, res, function() {
                                  if (req.user.userType =="Lecturer") {
                                    res.render('lecturer',{ title: 'Lecturer' });
                                  }else if (req.user.userType =="Student") {
                                    res.render('student',{ title: 'Student' });
                                  } else if (req.user.userType =="Admin"){
                                    res.render('admin',{ title: 'Admin' });
                                  }
                            });
                  }
                  else {
                  console.log(err);
                  }
              });
  
});

/* user login */
router.post('/signin',(req,res)=>{
        passport.authenticate('local')(req, res, function() {
            if (req.user.userType =="Lecturer") {
              res.render('lecturer',{ title: 'Lecturer' });
            }else if (req.user.userType =="Student") {
              res.render('student',{ title: 'Student' });
            } else if (req.user.userType =="Admin"){
              res.render('admin',{ title: 'Admin' });
            }

        });
});

module.exports = router;
