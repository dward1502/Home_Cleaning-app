const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')

const User = require('../model/users');

router.post('/signup', (req, res, next) => {
	User.find({ email: req.body.email })
		.exec()
		.then(user => {
			if (user) {
				return res.status(409).json({
					message: 'Email already exists'
				});
			} else {
				bcrypt.hash(req.body.password, 10, (err, hash) => {
					if (err) {
						return res.status(500).json({
							error: err
						});
					} else {
						const user = new User({
							_id: new mongoose.Types.ObjectId(),
							email: req.body.email,
              password: hash,
              type:req.body.type
						});
						user
							.save()
							.then(result => {
								res.status(201).json({
									message: 'User Created'
								});
							})
							.catch(err => {
								console.log(err);
								res.status(500).json({
									error: err
								});
							});
					}
				});
			}
		});
});

router.delete('/:userID', (req, res, next) => {
	const id = req.params.userID;
	User.remove({ _id: id })
		.exec()
		.then(result => {
			res.status(200).json({
				message: 'User Deleted'
			});
		})
		.catch(err => {
			res.status(500).json({
				error: err
			});
		});
});

router.get('/login', (req, res, next) => {
	User.findOne({ email: req.body.email })
		.exec()
		.then(users => {
      if(user.length < 1) {
        return res.status(401).json({
          message:'Auth failed'
        })
      }
      bcrypt.compare(req.body.password, user.password, (err,result) => {
        if(err) {
          return res.status(401).json({
            message:'Auth failed'
          })
        }
        if(result) {
         const token = jwt.sign({
            type: user.type,
            userID: user._id
          }, process.env.JWT_KEY,{
            expiresIn:"1h"
          })

          return res.status(200).json({
            message:'Auth successful',
            token:token
          })
        }
        res.status(401).json({
          message:"Auth failed"
        })
      })
    })
		.catch(err => {
			console.log(err);
			res.status(500).json({
				error: err
			});
		});
});

router.patch('/edit/:userID', (req, res, next) => {});

module.exports = router;
