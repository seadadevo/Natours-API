const mongoose = require(`mongoose`);
const tourSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'A tour must have a name'],
    unique: true,
  },
  durations: {
    type: Number,
    required: [true, 'A tour must have a duration'] // validatior
  },
  maxGroupSize: {
    type: Number,
    required: [true, 'A tour must have a group size']
  },
  difficulty: {
    type: String,
    required: [true, "A tour must have a difficulty"], 
  },
  ratingsAverage: {
    type: Number,
    default: 4.5, 
  },
  ratingsQuantity: {
    type: Number,
    default: 0, 
  },
  price: {
    type: Number,
    required: [true, 'A tour must have a price'],
  },
  priceDiscount: Number,
  summary: {
    type: String,
    trim: true,
    required: [true, "tour must have a description"]
  },
  description: {
    type: String,
    trim: true
  },
  imageCover: {
    type: String,
    required: [true, "tour must have a cover Image"]
  },
  images: [String],
  craetedAt: {
    type: Date,
    default: Date.now
  },
  startDates: [Date]
});

const Tour = mongoose.model('Tour', tourSchema);

module.exports = Tour;
