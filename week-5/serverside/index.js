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
app.get('/tasks', ({ req, res }) => __awaiter(void 0, void 0, void 0, function* () {
    var query = 'SELECT * FROM Tasks';
    sql.query(connectionString, query, (err, rows) => {
        console.log("Data coming from DB", rows);
        res.json(rows);
    });
}));
app.post('/tasks', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, status } = req.body;
    var query = `INSERT INTO Tasks (name, status) VALUES (?, ?)`;
    sql.query(connectionString, query, [name, status], (err, rows) => {
        if (err) {
            console.log(err);
        }
        else {
            console.log("Data inserted in DB", rows);
            res.json(rows);
        }
    });
}));
app.put('/tasks/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log("parameters value", req.params);
        const taskId = req.params.id;
        const { name, status } = req.body;
        const query = `UPDATE Tasks SET name = ?, status = ? WHERE id =${taskId}`;
        sql.queryRaw(connectionString, query, [name, status], (err, rows) => {
            if (err) {
                console.log(err);
            }
            else {
                console.log("Data updated in DB", rows);
                res.json('Task Updated');
            }
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
}));
app.delete('/tasks/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const taskId = req.params.id;
        var query = `DELETE FROM Tasks WHERE id = ${taskId}`;
        sql.query(connectionString, query, (err, rows) => {
            console.log("Data updated in DB", rows);
            res.json("Task deleted");
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
}));
app.listen(4000, () => {
    console.log('BE servering runing');
});
