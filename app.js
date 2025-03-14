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
    res.render('register', { message: null });  // Ensure message is passed
});

// Contact page
app.get('/contact', (req, res) => {
    res.render('contact');
});

// Handle registration form submission
app.post('/register', (req, res) => {
    const { name, email, phone, assistance_type } = req.body;
    
    console.log("Form Data Received:", req.body); // Debugging to check data

    const sql = "INSERT INTO users (name, email, phone, assistance_type) VALUES (?, ?, ?, ?)";

    con.query(sql, [name, email, phone, assistance_type], (error, result) => {
        if (error) {
            console.error("Database Insertion Error:", error);
            return res.render('register', { message: "Error occurred while registering. Please try again." });
        }

        console.log("Data Inserted Successfully");
        res.render('register', { message: "Our representative will contact you within 24 hours." });
    });
});

// Start server
app.listen(5500, () => {
    console.log('Server started on http://localhost:5500');
});
