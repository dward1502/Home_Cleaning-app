const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Property = require('../model/property');
const Checklist = require('../model/checklist');

//get all properties
router.get('/', (req, res, next) => {
	Property.find()
		.exec()
		.then((doc) => {
			console.log(doc);
			if (doc) {
				res.status(200).json(doc);
			} else {
				res.status(404).json({ message: 'No Properties are found' });
			}
		})
		.catch((err) => {
			console.log(err);
			res.status(500).json({ error: err });
		});
});

//create new properties
router.post('/', (req, res, next) => {
	console.log(`This is post properties data : ${JSON.stringify(req.body)}`);
	const duties = req.body.duties;
	createTemplate(duties)

	const propertyData = new Property({
		_id: new mongoose.Types.ObjectId(),
		address: req.body.address,
		owner: req.body.owner,
		email: req.body.email,
		lockbox: req.body.lockbox,
		doorcode: req.body.doorcode,
		type: req.body.type,
		description: req.body.description,
		duties: req.body.duties,
		template:req.body.template
	});
	
	propertyData
		.save()
		.then((result) => {
			// console.log(`New Property data result ${result}`);
			res.status(200).json({
				message: 'Handling POST requests to /properties',
				createdProperty: propertyData
			});
		})
		.catch((err) => console.log(err));
});

createTemplate = (data) => {
	console.log(`This is duties pre format ${JSON.stringify(data)}`);
	data.map((i)=>{
		console.log(i.task);
	})
}

//find property by specific property ID
router.get('/:propertyID', (req, res, next) => {
	const id = req.params.propertyID;

	Property.findById(id)
		.exec()
		.then((doc) => {
			console.log(doc);
			if (doc) {
				res.status(200).json({
					message: 'Retrieved specific property based on ID',
					data: doc
				});
			} else {
				res.status(404).json({ message: 'No valid entry found for provided ID' });
			}
		})
		.catch((err) => {
			console.log(err);
			res.status(500).json({ error: err });
		});
});

//edit property by specific ID
router.patch('/:propertyID', (req, res, next) => {
	const id = req.params.propertyID;
	console.log(`Edit property info server : ${JSON.stringify(req.body)}`);
	// const updateOps = {};
	// for (const ops of req.body) {
	// 	updateOps[ops.propName] = ops.value;
	// }

	Property.findOneAndUpdate({ _id: id }, { $set: req.body },{useFindAndModify: false})
		.exec()
		.then((result) => {
			console.log(result);
			res.status(200).json({
				message: 'Property updated',
				result: result
			});
		})
		.catch((err) => {
			console.log(err);
			res.status(500).json({
				error: err
			});
		});
});

//delete property by specific ID
router.delete('/:propertyID', (req, res, next) => {
	const id = req.params.propertyID;
	Property.remove({ _id: id }).exec().then((result) => {
		res
			.status(200)
			.json({
				message: `Deleted product with ${id}`,
				result: result
			})
			.catch((err) => {
				console.log(err);
				res.status(500).json({
					error: err
				});
			});
	});
});

module.exports = router;
