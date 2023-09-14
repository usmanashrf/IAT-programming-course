const express = require("express");

const cors = require('cors');

const app = express();

app.use(cors());

const sql = require('msnodesqlv8');


const connectionString="server=DESKTOP-QVV36EG;Database=storeDb;Trusted_Connection=Yes;Driver={SQL Server Native Client 11.0}";

app.get('/data', ({ req, res }:any) => {

        var query = 'SELECT * FROM Customer';

        sql.query(connectionString,query, (err:any,rows:any)=>{
            console.log("Data coming from DB",rows);
            res.json(rows);
        })
     });


app.listen(4000,()=>{
    console.log('BE servering runing');
})