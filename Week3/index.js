const express = require('express');
const bodyParser = require('body-parser');
const path = require('path'); // 必須引入 path 模組
const app = express();

// Set the 'views' directory
app.set('views', path.join(__dirname, 'views'));

// Debug the views directory path
console.log('Views directory:', app.get('views'));

// Set up EJS as the templating engine
app.set('view engine', 'ejs');

// Middleware to parse form data
app.use(bodyParser.urlencoded({ extended: false }));

// Serve static files (like CSS, images, etc.)
app.use(express.static('public'));

// Route to render the form page (index.ejs)
app.get('/', (req, res) => {
    res.render('index');  // Render the form page (index.ejs)
});

// Route to handle form submission
app.post('/submitmembership', (req, res) => {
    // Extract data from the form submission
    const { firstname, surname, email, mobileNumber, capstyle, inputNumCaps, comments } = req.body;

    // Render the thankyou page with the submitted data
    res.render('thankyou', {
        firstname: firstname,
        surname: surname,
        email: email,
        mobileNumber: mobileNumber,
        capstyle: capstyle,
        inputNumCaps: inputNumCaps,
        comments: comments
    });
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
