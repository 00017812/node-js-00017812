const express = require('express');
const path = require('path');

const apiRoutes = require('./routes/api');
const webRoutes = require('./routes/web');

const port = 3000;

const app = express();

global.mock_db = path.join(__dirname, './data/mock_db.json');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.use('/images', express.static(path.join(__dirname, 'views/vocabulary/images')));

const vocabularies = [
    {
        id: 1,
        words: 'Apple',
        translation: 'Яблока',
        image: '/images/apple-photo.jpg', // Corrected image path
        dateofadding: "2025-06-04"
    }
];

app.get('/vocabulary', (req, res) => {
    res.render('vocabulary/index', { vocabularies });
});

app.use('/css', express.static('public/css'));
app.use('/js', express.static('public/js'));

app.use('/api', apiRoutes);
app.use('/', webRoutes);


app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});