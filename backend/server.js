const express = require("express");
const cors = require("cors");
require("dotenv").config();
const port = process.env.PORT || 5000;
const routes = require('./routes/index');

const app = express();
app.set('port', (process.env.PORT || 5000));
app.use(cors());
app.use(express.json());
app.use('/', routes);

if (process.env.NODE_ENV == 'production') 
{
  app.use(express.static('frontend/build'));

  app.get('*', (req, res) => 
 {
    res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'));
  });
}
 
app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});