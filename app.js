const express = require('express');
const path = require('path');

const apiRoutes = require('./routes/api');
const webRoutes = require('./routes/web');

const port = 3000

const app = express();

global.mock_db = path.join(__dirname, './data/mock_db.json');

// Middleware to parse JSON and URL-encoded bodies
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Set Pug as the view engine and point to the views folder
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// Serve static files (for CSS/JS)
app.use('/css', express.static('public/css'));
app.use('/js', express.static('public/js'));

// Use API and web routes
app.use('/api', apiRoutes);
app.use('/', webRoutes);

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});
