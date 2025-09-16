const mongoose = require(`mongoose`);
const fs = require(`fs`);
const dotenv = require('dotenv');
const Tour = require("./../../models/tourModel") 

dotenv.config({ path: './config.env' });


const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD,
);

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then((con) => {
    // console.log(con.connections)
    console.log('DB Connection Successful!');
  });

// ! Read File 
const tours = JSON.parse(fs.readFileSync(`${__dirname}/tours-simple.json`, 'utf-8'))

// ! Import data into database
const importData = async () => {
   try {
    await Tour.create(tours)
    console.log('Data Successfully Loaded');
   } catch (err) {
    console.error(err);
   }
}

// ! Delete All Data from Collection 
const deleteData = async () => {
    try {
        await Tour.deleteMany();
        console.log('Data Successfully Deleted!')
        process.exit()
    } catch (err) {
        console.log(err)
    }
}

if(process.argv[2] === '--import') {
    importData()
} else if(process.argv[2] === '--delete') {
    deleteData()
}