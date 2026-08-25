const express = require('express');
const session = require('express-session');
const cookieParser = require('cookie-parser');

const app = express();


app.use(session({
    secret: 'mySecretKey',
    resave: false,
    saveUninitialized: true,
    cookie: {
        maxAge: 60000
    }
}));


app.use(cookieParser());



app.get('/login', (req, res) => {
    req.session.username = 'JohnDoe';
    res.send('Session started for ' + req.session.username);
});

app.get('/profile', (req, res) => {
    if (req.session.username) {
        res.send('Welcome ' + req.session.username);
    } else {
        res.send('Please log in first.');
    }
});

app.get('/logout', (req, res) => {
    req.session.destroy(err => {
        if (err) {
            return res.send('Error destroying session');
        }

        res.send('Session destroyed successfully');
    });
});



app.get('/setcookie', (req, res) => {
    res.cookie('username', 'JohnDoe', {
        maxAge: 3600000,
        httpOnly: true,
        secure: false
    });

    res.send('Cookie has been set!');
});

app.get('/getcookie', (req, res) => {
    const user = req.cookies.username;

    if (user) {
        res.send('Welcome back, ' + user);
    } else {
        res.send('No cookie found.');
    }
});

app.get('/deletecookie', (req, res) => {
    res.clearCookie('username');
    res.send('Cookie deleted.');
});

app.get('/welcome', (req, res) => {
    const user = req.query.user;
    const role = req.query.role;

    res.send(`Welcome ${user}, your role is ${role}`);
});

app.listen(3000, () => {
    console.log('Server running on port 3000');
});