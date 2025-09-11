const express = require('express');
const fs = require('fs');
const app = express();

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


app.post('/', (req, res) => {
    res.send('You can post to this endpoint')
})


const port = 3000;
app.listen(port, () => {
    console.log(`App runing on port ${port}...`);
});
