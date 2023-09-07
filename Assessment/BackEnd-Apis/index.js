"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const express = require("express");
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
app.use(cors());
app.use(bodyParser.json());
const sql = require('msnodesqlv8');
const connectionString = "server=DESKTOP-QVV36EG;Database=storeDb;Trusted_Connection=Yes;Driver={SQL Server Native Client 11.0}";
app.post('/login', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, password } = req.body;
        // Ensure that both username and password are provided in the request body
        if (!username || !password) {
            return res.status(400).json({ error: 'Username and password are required.' });
        }
        // Create a query to validate user credentials
        var query = `SELECT * FROM Users WHERE username = ? AND password = ?`;
        sql.query(connectionString, query, [username, password], (err, rows) => {
            console.log("Data coming from DB", rows);
            res.json(rows);
        });
    }
    catch (err) {
        console.error(err.message);
        res.status(500).json({ error: 'Internal server error.' });
    }
}));
// Define the signup API endpoint
app.post('/signup', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, password } = req.body;
        console.log('request body', req.body);
        // Ensure that username, password, and email are provided in the request body
        if (!username || !password) {
            return res.status(400).json({ error: 'Username and password are required.' });
        }
        var query = `INSERT INTO Users (username, password) VALUES (?, ?)`;
        sql.query(connectionString, query, [username, password], (err, rows) => {
            if (err) {
                console.log(err);
            }
            else {
                console.log("Data inserted in DB", rows);
                res.json(rows);
            }
        });
    }
    catch (err) {
        console.error(err.message);
        return res.status(500).json({ error: 'Internal server error.' });
    }
}));
app.get('/movies', ({ req, res }) => {
    try {
        var query = 'SELECT * FROM  Movies';
        sql.query(connectionString, query, (err, rows) => {
            res.status(200).json(rows);
        });
    }
    catch (error) {
        console.error('An error occurred:', error.message);
        res.status(500).json({ error: 'Internal server error.' });
    }
});
app.get('/movie/:name', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const movieName = req.params.name;
        const query = `SELECT * FROM Movies WHERE title = '${movieName}'`;
        sql.queryRaw(connectionString, query, (err, rows) => {
            if (err) {
                console.error(err);
                res.status(500).send('Server Error');
            }
            else {
                if (rows.length === 0) {
                    // No movie found with the given name
                    res.status(404).json({ error: 'Movie not found' });
                }
                else {
                    // Movie found, return the data
                    res.status(200).json(rows);
                }
            }
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
}));
app.listen(3000, () => {
    console.log('BE servering runing');
});
