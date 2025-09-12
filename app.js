const express = require('express');
const fs = require('fs');
const app = express();

//! To prepate the middleware
app.use(express.json())

const tours = JSON.parse(fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)) 



app.get('/api/v1/tours', (req, res) => {
    res.status(200).json({
        status: 'success',
        reults: tours.length,
        data: {
            tours 
        }
    }) 
})

// ! Starting post 
app.post('/api/v1/tours', (req, res) => {
    console.log(req.body)
    const newId = tours[tours.length - 1].id + 1;
    const newTour = Object.assign({id: newId} , req.body)
    tours.push(newTour)
    fs.writeFile(`${__dirname}/dev-data/data/tours-simple.json`, JSON.stringify(tours), err => {
        res.status(201).json({
            status: 'success',
            data: {
                tour: newTour
            }
        })
    })
   
})

// ! id params
app.get('/api/v1/tours/:id', (req, res) => {
    console.log(req.params);
    const id = req.params.id * 1;
    const tour = tours.find(el => el.id === id)
    if(!tour){
        return res.status(404).json({
            status: 'fail',
            message: 'Tour not Found'
        })
    }

    res.status(200).json({
        status: 'success',
        data: {
            tour 
        }
    }) 
})

//! patch data
app.delete('/api/v1/tours/:id', (req, res) => {
    const id = req.params.id * 1;
    const tour = tours.find(el => el.id === id)

    if(!tour){
        return res.status(404).json({
            status: 'fail',
            message: 'Tour not Found'
        })
    }
    
    res.status(204).json({
        status: 'success',
        data: null
    })
})
    // Object.assign(tour, req.body)


    // fs.writeFile(`${__dirname}/dev-data/data/tours-simple.json`, JSON.stringify(tours), err => {
    //     res.status(200).json({
    //     status: 'success',
    //     data: {
    //         tour
    //     }
    // })
    // })

// })


const port = 3000;
app.listen(port, () => {
    console.log(`App runing on port ${port}...`);
});
