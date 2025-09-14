const app = require('./app')
const dotenv = require('dotenv')
dotenv.config({ path: './config.env' });
// console.log(process.env.USER)
console.log(process.env.NODE_ENV);
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`App runing on port ${port}...`);
});