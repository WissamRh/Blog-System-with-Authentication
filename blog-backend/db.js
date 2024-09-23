const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'localhost',       
  user: 'root',            
  password: 'your_password', 
  database: 'blogDB'       
});

connection.connect((err) => {
  if (err) {
    console.error('Database connection failed: ' + err.stack);
    return;
  }
  console.log('Connected to MySQL');
});

module.exports = connection;