// app.js
const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();
const port = 3000;

// Middleware to parse the form data
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files from the 'public' directory
 
// Route to handle the signup form submission
app.post('/signup', (req, res) => {
    const userData = {
        username: req.body.username,
        password: req.body.password,
    };

    const filePath = path.join(__dirname, 'users.json');

    // Read the existing users from the 'users.json' file
    fs.readFile(filePath, 'utf8', (err, data) => {
        let users = [];
        if (err) {
            // If the file doesn't exist, create it
            if (err.code === 'ENOENT') {
                console.log('File not found, creating a new one.');
            } else {
                console.error('Error reading file:', err);
                return res.status(500).send('Internal server error');
            }
        } else if (data) {
            users = JSON.parse(data);
        }

        // Add the new user data to the array
        users.push(userData);

        // Write the updated users array back to the 'users.json' file
        fs.writeFile(filePath, JSON.stringify(users, null, 2), (err) => {
            if (err) {
                console.error('Error writing file:', err);
                return res.status(500).send('Error saving data');
            }
            // res.send('Signup successful');
            res.redirect("./home.html")
        });
    });
});

// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
