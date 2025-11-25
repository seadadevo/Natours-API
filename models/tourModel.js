const mongoose = require(`mongoose`);
const slugify = require('slugify');
const validator = require('validator');

const tourSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'A tour must have a name'],
    unique: true,
    trim: true,
    maxLength: [40, 'A tour must have less or equal than 40 characters'],
    minLength: [10, "A tour must have greater or equal than 10 characters"],
    // validate: [validator.isAlpha, 'Tour name must only contain characters']
  },
  slug: String,
  duration: {
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
    enum: {
      values :['easy', 'medium', 'difficult'],
      messages: 'Difficulty is either easy, medium, difficult'
    } 
  },
  ratingsAverage: {
    type: Number,
    default: 4.5, 
    min: [1, 'Rating must be above 1'],
    max: [5, 'Rating must be below 5'],
  },
  ratingsQuantity: {
    type: Number,
    default: 0, 
  },
  price: {
    type: Number,
    required: [true, 'A tour must have a price'],
  },
  priceDiscount: {
    type: Number,
    validate: {
      validator: function(val) {
        return this.price > val 
      },
      message: `Discount price ({VALUE}) should be below the regular price`
    }
  },
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
  createdAt: {
    type: Date,
    default: Date.now(),
    select: false
  },
  startDates: [Date],
  secretTour:{ 
    type: Boolean,
    default: false 
  },
},
  {
    toJSON: {virtuals: true},
    toObject: {virtuals: true},
  }
);


tourSchema.virtual('durationWeeks').get(function() {
  return this.duration / 7;
})

tourSchema.pre('save', function(next){
  this.slug = slugify(this.name, {lower: true})
  next()
})

tourSchema.pre('save', (next) => {
  console.log('Will save document')
  next()
})

tourSchema.post('save', (doc, next) =>{
  console.log(doc)
  next()
} )


tourSchema.pre(/^find/ , function(next){
  this.start = Date.now();
  this.find({secretTour: {$ne : true}})  
  next()
})

tourSchema.post(/^find/ , function(docs, next){
  console.log(`Query took ${Date.now() - this.start} milliseconds`)
  next()
})

tourSchema.pre('aggregate' , function(next){
  this.pipeline().unshift({ $match: {secretTour: {$ne: true}}})
  console.log(this.pipeline())
  next()
})


const Tour = mongoose.model('Tour', tourSchema);

module.exports = Tour;
