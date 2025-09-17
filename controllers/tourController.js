const Tour = require("../models/tourModel")


exports.getAllTours = async (req, res) => {
  try { 
    // eslint-disable-next-line node/no-unsupported-features/es-syntax
    const queryObj = {...req.query} // {"duraion": 2 }
    const excludeFields = ['page', 'sort', 'limit', 'fields']
    excludeFields.forEach(el => delete queryObj[el]);

    let querySting = JSON.stringify(queryObj)
    querySting = querySting.replace(/\b(gte|gt|lte}lt)\b/g, match => `$${match}`)
    const finalQueryObj = JSON.parse(querySting);

    const query = await Tour.find(finalQueryObj)
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
