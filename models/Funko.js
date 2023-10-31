const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const funkoSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  imgUrl: {
    type: String,
    required: false
  },
  description: {
    type: String,
    required: false
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  userLikes: [{
    type: Schema.Types.ObjectId,
   ref: 'User'
  }],
  userDisLikes: [{
    type: Schema.Types.ObjectId,
    ref: 'User'
  }],
  comments: [{ type: Schema.Types.ObjectId, ref: 'Comment' }] // Array to store comments
});

module.exports = mongoose.model('Funko', funkoSchema);
