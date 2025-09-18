const Tour = require("../models/tourModel")


exports.getAllTours = async (req, res) => {
  try { 
    // eslint-disable-next-line node/no-unsupported-features/es-syntax
     // 1) Filtering
     // eslint-disable-next-line node/no-unsupported-features/es-syntax
    const queryObj = { ...req.query }; // {"duration": 5, "sort": "-price"}
    const excludeFields = ['page', 'sort', 'limit', 'fields'];
    excludeFields.forEach(el => delete queryObj[el]);

    let queryString = JSON.stringify(queryObj);
    queryString = queryString.replace(/\b(gte|gt|lte|lt)\b/g, match => `$${match}`);
    const finalQueryObj = JSON.parse(queryString);
    // Base query
    let query = Tour.find(finalQueryObj)
    // 2) Sorting
    if(req.query.sort){
      // if a client sent a more request like sort=price,ratingsAverage
      const sortBy = req.query.sort.split(',').join(' ');
      query = query.sort(sortBy)
    } else {
      // default sort
      query = query.sort('-createdAt');
    }
    // 3) limiting fields
    if(req.query.fields) {
      const fields = req.query.fields.split(',').join(' ');;
      // query = query.select('name duration price')
      query = query.select(fields)
    } else {
      query = query.select('-__v')

    }
  
    // 3) Pagination
    const page = req.query.page * 1 || 1;
    const limit = req.query.limit * 1 || 100
    const skip = (page - 1) * limit;

    query = query.skip(skip).limit(limit)

    if(req.query.page) {
      const numTours = await Tour.countDocuments();
      if(skip >= numTours) throw new Error('This Page does not exist')
    }

    const tours = await query;

    res.status(200).json({
      status: 'success',
      requestedAt: req.requestTime,
      results: tours.length,
      data: {
        tours
      }
    });
  } catch (err) {
    res.status(400).json({
       status: 'fail',
     message: err
    })
  }
}; 

exports.getTour = async (req, res) => {
  try {
    const tour = await Tour.findById(req.params.id)
    // Tour.findOne({_id: req.params.id})
    
    res.status(200).json({
      status: 'success',
      data: { tour }
    })

  } catch (err) {
    res.status(400).json({
       status: 'fail',
     message: err
    })
  }
 
 
};

exports.createTour = async (req, res) => {
try {
  const newTour = await Tour.create(req.body)

   res.status(201).json({
        status: 'success',
        data: {
          tour: newTour
        }
      });
  
} catch (err) {
  res.status(400).json({
    status: 'fail',
    message: err
  })
}

};

exports.updateTour = async (req, res) => {
  try {
    const tour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    res.status(200).json({
          status: 'success',
          data: {
            tour
          }
        });
    
  } catch (err) {
    res.status(400).json({
    status: 'fail',
    message: err
  })
  }
  
};

exports.deleteTour = async (req, res) => {
  try {
    const tour = await Tour.findByIdAndDelete(req.params.id)
    if(tour){
      res.status(204).json({
      status: 'success',
      data: null,
    });
    }
  } catch (err) {
     res.status(400).json({
    status: 'fail',
    message: err
  })
  }
  

};
