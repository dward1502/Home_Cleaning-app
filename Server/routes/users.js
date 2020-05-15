const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../model/users');

router.post('/signup', (req, res, next) => {
  console.log('Running signup');
  const body = req.body;
  console.log(`Request body in server : ${body}`);
  User.findOne({ email: req.body.email })
    .exec()
    .then((user) => {
      if (user) {
        return res.status(409).json({
          message: 'Email already exists',
        });
      } else {
        console.log('create new')
        bcrypt.hash(req.body.password, 10, (err, hash) => {
          if (err) {
            return res.status(500).json({
              error: err,
            });
          } else {
            const user = new User({
              _id: new mongoose.Types.ObjectId(),
              email: req.body.email,
              password: hash,
              name: req.body.name,
              permission: req.body.permission,
            });
            user
              .save()
              .then((result) => {
                res.status(201).json({
                  message: 'User Created',
                });
              })
              .catch((err) => {
                console.log(err);
                res.status(500).json({
                  error: err,
                });
              });
          }
        });
      }
    });
});

router.delete('/:userID', (req, res, next) => {
  const id = req.params.userID;
  User.findOneAndDelete({ _id: id })
    .exec()
    .then((result) => {
      res.status(200).json({
        message: 'User Deleted',
      });
    })
    .catch((err) => {
      res.status(500).json({
        error: err,
      });
    });
});

router.get('/login', (req, res, next) => {
  User.findOne({ email: req.body.email })
    .exec()
    .then((users) => {
      if (user.length < 1) {
        return res.status(401).json({
          message: 'Auth failed',
        });
      }
      bcrypt.compare(req.body.password, user.password, (err, result) => {
        if (err) {
          return res.status(401).json({
            message: 'Auth failed',
          });
        }
        if (result) {
          const token = jwt.sign(
            {
              type: user.type,
              userID: user._id,
            },
            process.env.JWT_KEY,
            {
              expiresIn: '1h',
            }
          );

          return res.status(200).json({
            message: 'Auth successful',
            token: token,
          });
        }
        res.status(401).json({
          message: 'Auth failed',
        });
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
});

router.patch('/edit/:userID', (req, res, next) => {
  const id = req.params.userID;
  const body = req.body;
  console.log(body);
  console.log(id);

	User.findOneAndUpdate({_id: id}, {$set:{email:req.body.email,name:req.body.name,permission:req.body.permission}},{useFindAndModify: false}).exec().then((result) => {
		console.log(result);
		res.status(200).json({
			message:'User updated',
			result:result
		})
	}).catch((err) => {
		console.log(err);
		res.status(500).json({
			error:err
		})
	})
	// res.status(200).json({
	// 	message:`Updated User Info /user/edit/${id}`
	// })
});

router.get('/', (req, res, next) => {
  User.find()
    .exec()
    .then((doc) => {
      if (doc) {
        res.status(200).json(doc);
      } else {
        res.status(404).json({ message: 'No Users are found' });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
});

router.get('/:userID', (req, res, next) => {
  const id = req.params.userID;
  User.findById(id)
    .exec()
    .then((doc) => {
      console.log(doc);
      if (doc) {
        res.status(200).json({
          message: 'Retrieved specific User based on ID',
          data: doc,
        });
      } else {
        res
          .status(400)
          .json({ message: 'No valid entry found for provided ID' });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: err });
    });
});

module.exports = router;
