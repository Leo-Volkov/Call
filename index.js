const express = require(`express`);
const app = express();
const mysql = require('mysql');

const port = 3005;
app.listen(port, () => {
  console.log(`200, server ${port}`)
});

// Настройки cors
let cors = require('cors');
app.use(cors({
  origin: "http://localhost:5173"
}));

// Настройка POST-запроса — JSON
app.use(express.json());

// Подключение Базы Данных
const db = mysql.createConnection({
  host: '127.0.0.1',
  user: 'root',
  password: '',
  database: 'Call'
});

// Проверка ощибок при подключении
db.connect(err => {
  if (err) throw err;
  console.log('200, mysql');
});



// Переменные:


app.post('/login/verification', (req, res) => {
  let value_password = req.query.value_password;
  if (value_password === "123321") {
    res.send("true");
  } else {
    res.send("false");
  };
});


// app.get('/e', (req, res) => {
//   let sql = `SELECT * FROM schedule`;
//   db.query(sql, (err, results) => {
//     if (err) throw err;
//     res.send(`Звонки получены: { ${JSON.stringify(results)} }`);
//   });
// });

