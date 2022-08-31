const express = require("express");
const cors = require("cors");
require("dotenv").config();
const path = require('path');
const port = process.env.PORT || 5000;
const routes = require('./routes/index');

const app = express();
app.set('port', (process.env.PORT || 5000));
app.use(cors());
app.use(express.json());
app.use('/', routes);

if (process.env.NODE_ENV === 'production') {
	app.use(express.static(path.join('/', 'frontend', 'build')));

	app.get('*', (req, res) => {
		res.sendFile(path.join('/', 'frontend', 'build', 'index.html'))
	});

	app.use((req, res, next) => {
		res.setHeader('Access-Control-Allow-Origin', '*');
		res.setHeader(
			'Access-Control-Allow-Headers',
			'Origin, X-Requested-With, Content-Type, Accept, Authorization'
		);
		res.setHeader(
			'Access-Control-Allow-Methods',
			'GET, POST, PATCH, DELETE, OPTIONS'
		);
		next();
	});
}
 
app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});