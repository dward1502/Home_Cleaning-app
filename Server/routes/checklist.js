const express = require('express')
const router = express.Router();
const mongoose = require('mongoose')

const Checklist = require('../model/checklist')

router.post('/', (req,res,next) => {
  console.log((`This is post checklist data ${JSON.stringify(req.body)}`));
  const checklistData = new Checklist({
    _id: new mongoose.Types.ObjectId(),
    propertyID:req.body.propertyID,
    address: req.body.address,
    tasks: req.body.tasks
  });

  checklistData.save().then((result)=>{
    res.status(200).json({
      message: 'Handling POST requests to /properties',
      createdChecklist: checklistData
    });
  })
  .catch((err) => console.log(err));
})

module.exports = router;