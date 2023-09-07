const express = require("express");
const bodyParser = require('body-parser');  
const cors = require('cors');

const app = express();

app.use(cors());
app.use(bodyParser.json()); 
const sql = require('msnodesqlv8');


const connectionString="server=DESKTOP-QVV36EG;Database=storeDb;Trusted_Connection=Yes;Driver={SQL Server Native Client 11.0}";

app.post('/login', async (req:any, res:any) => {
    try {
      const { username, password } = req.body;
  
      // Ensure that both username and password are provided in the request body
      if (!username || !password) {
        return res.status(400).json({ error: 'Username and password are required.' });
      }
  
      // Create a query to validate user credentials
      
      var query = `SELECT * FROM Users WHERE username = ? AND password = ?`;

      sql.query(connectionString,query,[username, password], (err:any,rows:any)=>{
          
          res.json(rows);
      })
    
    } catch (err:any) {
      console.error(err.message);
      res.status(500).json({ error: 'Internal server error.' });
    }
  });

  // Define the signup API endpoint
app.post('/signup', async (req: any, res :any) => {
    try {
      const { username, password } = req.body;
        
      if (!username || !password) {
        return res.status(400).json({ error: 'Username and password are required.' });
      }

    var query = `INSERT INTO Users (username, password) VALUES (?, ?)`;

    sql.query(connectionString,query,[username, password], (err:any,rows:any)=>{
        if (err) {
            console.log(err);
          } else {
            res.json(rows);
          }
    })
    } catch (err:any) {
      console.error(err.message);
      return res.status(500).json({ error: 'Internal server error.' });
    }
  });
  
  app.get('/movies', ({req, res}:any) => {
    try {
        var query = 'SELECT * FROM  Movies';

        sql.query(connectionString,query, (err:any,rows:any)=>{
            res.status(200).json(rows);
        })
    } catch (error :any) {
      console.error('An error occurred:', error.message);
      res.status(500).json({ error: 'Internal server error.' });
    }
  });

  app.get('/movie/:name', async (req: any, res: any) => {
    try {
      const movieName = req.params.name;
  
      const query = `SELECT * FROM Movies WHERE title = '${movieName}'`;
  
      sql.queryRaw(connectionString, query, (err: any, rows: any) => {
        if (err) {
          console.error(err);
          res.status(500).send('Server Error');
        } else {
          if (rows.length === 0) {
            // No movie found with the given name
            res.status(404).json({ error: 'Movie not found' });
          } else {
            // Movie found, return the data
            res.status(200).json(rows);
          }
        }
      });
    } catch (error) {
      console.error(error);
      res.status(500).send('Server Error');
    }
  });


app.listen(3000,()=>{
    console.log('BE servering runing');
})