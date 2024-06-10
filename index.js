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


// Отправка расписания пользователю
app.get('/user/schedule', (rep, res) => {
  let schedule_type = ""

  // получение типа расписаиния 
  let sql = `SELECT id FROM types WHERE enabled = 1`;
  db.query(sql, (err, results) => {
    if (err) throw err;

    if (results[0].id == 3) {
      schedule_type = "shortenedDay";
    } else {
      let Dat = new Date
      if (Dat.getDay() == 6) {
        schedule_type = "saturday";
      } else if (Dat.getDay() == 0) {
        // Воскрисение: звонки и расписание отключено
        res.send("OFF");
      } else {
        schedule_type = "weekdays";
      };
    };

    // Получение расписания звонков
    sql = `SELECT * FROM ${schedule_type}`;
    db.query(sql, (err, results) => {
      if (err) throw err;
      let schedule = JSON.stringify(results)

      // Получение милодии звонка
      sql = `SELECT * FROM melodies WHERE enabled = true`;
      db.query(sql, (err, results) => {
        if (err) throw err;
        let melodies = JSON.stringify(results)

        // Отправка данных пользователю
        res.send({
          schedule,
          melodies
        });
      });
    });
  });
});


// Индификация на прова к администрации 
app.post('/login/verification', (req, res) => {
  let value_password = req.body.value_password;
  if (value_password === "123321") {
    res.send("true");
  } else {
    res.send("false");
  };
});


// Отправка данных в админку
app.get('/admin/schedule', (rep, res) => {

  // 
  let sql = "SELECT * FROM weekdays";
  db.query(sql, (err, results) => {
    if (err) throw err;
    console.log(`Результат weekdays: ${JSON.stringify(results)}`);
    let weekdays = JSON.stringify(results)

    // 
    let sql = "SELECT * FROM saturday";
    db.query(sql, (err, results) => {
      if (err) throw err;
      console.log(`Результат saturday: ${JSON.stringify(results)}`);
      let saturday = JSON.stringify(results)

      // 
      let sql = "SELECT * FROM shortenedDay";
      db.query(sql, (err, results) => {
        if (err) throw err;
        console.log(`Результат shortenedDay: ${JSON.stringify(results)}`);
        let shortenedDay = JSON.stringify(results)

        // 
        let sql = "SELECT enabled FROM types WHERE type = 'shortenedDay'";
        db.query(sql, (err, results) => {
          if (err) throw err;
          console.log(`Результат shortenedDay_enabled: ${JSON.stringify(results)}`);
          let shortenedDay_enabled = JSON.stringify(results)

          // 
          let sql = "SELECT * FROM melodies";
          db.query(sql, (err, results) => {
            if (err) throw err;
            console.log(`Результат melodies: ${JSON.stringify(results)}`);
            let melodies = JSON.stringify(results)

            res.send({
              weekdays,
              saturday,
              shortenedDay,
              melodies,
              shortenedDay_enabled
            })
          });
        });
      });
    });
  });
});

app.put('', (rep, res) => {
   
});

// let x
// app.get('/e', (req, res) => {
//   let sql = `SELECT * FROM schedule`;
//   db.query(sql, (err, results) => {
//     if (err) throw err;
//     x = JSON.stringify(results)
//   });
//   res.send(`Звонки получены: { ${x} }`);
// });




