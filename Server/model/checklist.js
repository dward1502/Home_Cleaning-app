const mongoose = require('mongoose');

const checklistSchema = mongoose.Schema({
  _id:mongoose.Schema.Types.ObjectId,
  propertyID: String,
  address: String,
  date: String,
  tasks: [mongoose.Schema.Types.Mixed],
  startTime: Number,
  endTime: Number,
  completed:{type:Boolean},
  task_chosen:[mongoose.Schema.Types.Mixed]
})

module.exprots = mongoose.model('Checklist', checklistSchema)