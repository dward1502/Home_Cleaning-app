const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Property = require('../model/property');

router.get('/', (req, res, next) => {
	res.status(200).json({
		message: 'Handling GET requests to /properties'
	});
});

router.post('/', (req, res, next) => {
	const propertyData = new Property({
		_id: new mongoose.Types.ObjectId(),
		address: req.body.address,
		owner: req.body.owner,
		email: req.body.email,
		lockbox: req.body.lockbox,
		doorcode: req.body.doorcode,
		type: req.body.type,
		description: req.body.description
	});
	propertyData
		.save()
		.then(result => {
			console.log(result);
		})
		.catch(err => console.log(err));

	res.status(200).json({
		message: 'Handling POST requests to /properties',
		createdProperty: propertyData
	});
});

router.get('/:propertyID', (req, res, next) => {
	const id = req.params.propertyID;

	Property.findById(id)
		.exec()
		.then(doc => {
      console.log(doc);
      if(doc) {
        res.status(200).json(doc)
      } else {
        res.status(404).json({message:'No valid entry found for provided ID'})
      }
		})
		.catch(err => {
      console.log(err)
      res.status(500).json({error:err})
    });
});
router.patch('/:propertyID', (req, res, next) => {
	const id = req.params.propertyID;

	res.status(200).json({
		message: `Updated product! /properties/${id}`
	});
});
router.delete('/:propertyID', (req, res, next) => {
	const id = req.params.propertyID;

	res.status(200).json({
		message: `Deleted product at /properties/${id}`
	});
});

module.exports = router;
