const express = require('express');
const app = express();
const port = 4000; // or any port you prefer

// Middleware to check if it's working hours
const checkWorkingHours = (req, res, next) => {
    const now = new Date();
    const dayOfWeek = now.getDay(); // 0 = Sunday, 1 = Monday, ..., 6 = Saturday
    const hour = now.getHours();

    if (dayOfWeek >= 1 && dayOfWeek <= 5 && hour >= 9 && hour < 17) {
        next(); // Continue to the next middleware or route
    } else {
        res.send('The web application is only available during working hours (Monday to Friday, from 9 to 17).');
    }
};

// Use EJS as the view engine
app.set('view engine', 'ejs');
app.set('views', './views');

// Serve static files from the public folder
app.use(express.static('public'));

// Use the custom middleware for all routes
app.use(checkWorkingHours);

// Define routes
app.get('/', (req, res) => {
    res.render('home');
});

app.get('/services', (req, res) => {
    res.render('services');
});

app.get('/contact', (req, res) => {
    res.render('contact');
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
