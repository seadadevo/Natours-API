const express = require('express');
const fs = require('fs');
const app = express();
const morgan = require('morgan')

//! 1) MIDDLEWARE
app.use(morgan('dev'));
app.use(express.json());

app.use((req, res, next) => {
  console.log('Hello from the middleware');
  next();
})
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString()
  next()
})

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
);

const users = JSON.parse(fs.readFileSync(`${__dirname}/dev-data/data/users.json`))
// ! 2) Route Handlers
const getAllTours = (req, res) => {
  console.log(req.requestTime)
  res.status(200).json({
    status: 'success',
    requestedAt: req.requestTime,
    reults: tours.length,
    data: {
      tours,
    },
  });
};


const getTour = (req, res) => {
  console.log(req.params);
  const id = req.params.id * 1;
  const tour = tours.find((el) => el.id === id);
  if (!tour) {
    return res.status(404).json({
      status: 'fail',
      message: 'Tour not Found',
    });
  }

  res.status(200).json({
    status: 'success',
    data: {
      tour,
    },
  });
};

const createTour = (req, res) => {
  console.log(req.body);
  const newId = tours[tours.length - 1].id + 1;
  const newTour = Object.assign({ id: newId }, req.body);
  tours.push(newTour);
  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    (err) => {
      res.status(201).json({
        status: 'success',
        data: {
          tour: newTour,
        },
      });
    }
  );
};

const updateTour = (req, res) => {
  const id = req.params.id * 1;
  const tour = tours.find((el) => el.id === id);
  
  if (!tour) {
    return res.status(404).json({
      status: 'fail',
      message: 'Tour not Found',
    });
  }
  Object.assign(tour, req.body);

  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    (err) => {
      res.status(200).json({
        status: 'success',
        data: {
          tour,
        },
      });
    }
  );
};

const deleteTour = (req, res) => {
  const id = req.params.id * 1;
  const tour = tours.find((el) => el.id === id);

  if (!tour) {
    return res.status(404).json({
      status: 'fail',
      message: 'Tour not Found',
    });
  }

  res.status(204).json({
    status: 'success',
    data: null,
  });
};
// Todo create User Handlers
// !Get All Users
const getAllUsers = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not yet defined!'
  })
  
}
const createUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not yet defined!'
  })
  
}
const getUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not yet defined!'
  })
  
}
const updateUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not yet defined!'
  })
  
}
const deleteUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not yet defined!'
  })
  
}

// ! 3) Routes


app.route('/api/v1/tours')
.get(getAllTours)
.post(createTour);

app.route('/api/v1/tours/:id')
.get(getTour)
.patch(updateTour)
.delete(deleteTour)

app.route('/api/v1/users')
.get(getAllUsers)
.post(createUser)

app.route('/api/v1/users/:id')
.get(getUser)
.patch(updateUser)
.delete(deleteUser)

// ! 4) Start Server
const port = 3000;
app.listen(port, () => {
  console.log(`App runing on port ${port}...`);
});
