const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const con = require('./conn');

// Serve static files from the public directory
app.use(express.static('public'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');

// Serve homepage
app.get('/', (req, res) => {
    res.render('home');
});

// Services page
app.get('/services', (req, res) => {
    res.render('services');
});

// How It Works page
app.get('/howitworks', (req, res) => {
    res.render('howitworks');
});

// Registration page
app.get('/register', (req, res) => {
    res.render('register');
});

// Contact page
app.get('/contact', (req, res) => {
    res.render('contact');
});

// Handle registration form submission
app.post('/register', (req, res) => {
    const { name, email, phone, assistance_type } = req.body;
    
    const sql = "INSERT INTO users (name, email, phone, assistance_type) VALUES (?, ?, ?, ?)";
    
    con.query(sql, [name, email, phone, assistance_type], (error, result) => {
        if (error) throw error;
        // Pass confirmation message to the view
        res.render('register', { message: "Our executive will contact you within 24 hours." });
    });
});


// Start server
app.listen(5500, () => {
    console.log('Server started on http://localhost:5500');
});


