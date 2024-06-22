// Инпорт библеотек
const express = require(`express`);
const app = express();
const { Sequelize, DataTypes, Model  } = require('sequelize');

// Создание порта 
const port = 3005;
app.listen(port, () => {
  console.log(`server: ${port}`)
});

// Настройки cors
let cors = require('cors');
app.use(cors({
  origin: "http://localhost:5173"
}));

// Настройка POST-запроса — JSON
app.use(express.json());

// Подключение Базы Данных
const sequelize = new Sequelize('Call', 'root', '', {
  host: '127.0.0.1',
  dialect: 'mysql'
},{
  // Установка глобальных правел
  define: {
    freezeTableName: true,
  }
});

// Проверка ощибок при подключении к БД
try {
  (async () => {
      await sequelize.authenticate();
    })(); //
  console.log('Соединение успешно установлено.');
} catch (error) {
  console.error('Невозможно подключиться к базе данных: ', error);
}

// Создание моделей БД
const Weekdays = sequelize.define('weekdays', {
  enabled: {
    type: DataTypes.BOOLEAN
  },
  start_time: DataTypes.TIME,
  end_time: DataTypes.TIME
},
{
  timestamps: false 
});

const Saturday = sequelize.define('saturdays', {
  enabled: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  },
  start_time: DataTypes.TIME,
  end_time: DataTypes.TIME
},
{
  timestamps: false 
});

const ShortenedDay = sequelize.define('shortenedDays', {
  enabled: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  },
  start_time: DataTypes.TIME,
  end_time: DataTypes.TIME
},
{
  timestamps: false 
});

const Melodies = sequelize.define('melodies', {
  title: DataTypes.STRING,
  enabled: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  }
},
{
  timestamps: false 
});

const Types = sequelize.define('types', {
  type: DataTypes.STRING,
  enabled: DataTypes.BOOLEAN
},
{
  timestamps: false 
});




// запросы
// Отправка расписания пользователю
app.get('/user/schedule', async (rep, res) => {
  const data = {
    schedule_type: ""
  };

  // получение типа расписаиния
  const types = await Types.findAll({
    attributes: ['id'],
    where: {
      enabled: 1
    }
  });
  let type = JSON.stringify(types)
    if (type[0].id == 3) {
      data.schedule_type = "ShortenedDay";
    } else {
      let Dat = new Date
      if (Dat.getDay() == 6) {
        data.schedule_type = "Saturday";
      } else if (Dat.getDay() == 0) {
        // Воскрисение: звонки и расписание отключено
        res.send("OFF");
      } else {
        data.schedule_type = "Weekdays";
      };
    };

    // Получение расписания звонков
    const results = await data.schedule_type.findAll();
    let schedule = JSON.stringify(results)

    // Получение милодии звонка
    const melodies = await Melodies.findAll({
      attributes: ['title'],
      where: {
        enabled: 1
      }
    });
        let melodie = JSON.stringify(melodies)[0]

        // Отправка данных пользователю
  res.send({ schedule, melodies })
});


// // Индификация на прова к администрации 
// app.post('/login/verification', async (req, res) => {
//   let value_password = req.body.value_password;
//   if (value_password === "123321") {
//     res.send("true");
//   } else {
//     res.send("false");
//   };
// });





// // Отправка данных в админку
// app.get('/admin/schedule', async (rep, res) => {

  // эта строка существует для автоматизации создания таблиц в базе даных 
  // (async () => {
    // await sequelize.sync();
    // console.log("Таблицы созданы");
  // })(); // Создаёт таблицы, если их нет

//   // 
//   let sql = "SELECT * FROM weekdays";
//   db.query(sql, (err, results) => {
//     if (err) throw err;
//     console.log(`Результат weekdays: ${JSON.stringify(results)}`);
//     let weekdays = JSON.stringify(results)

//     // 
//     let sql = "SELECT * FROM saturday";
//     db.query(sql, (err, results) => {
//       if (err) throw err;
//       console.log(`Результат saturday: ${JSON.stringify(results)}`);
//       let saturday = JSON.stringify(results)

//       // 
//       let sql = "SELECT * FROM shortenedDay";
//       db.query(sql, (err, results) => {
//         if (err) throw err;
//         console.log(`Результат shortenedDay: ${JSON.stringify(results)}`);
//         let shortenedDay = JSON.stringify(results)

//         // 
//         let sql = "SELECT enabled FROM types WHERE type = 'shortenedDay'";
//         db.query(sql, (err, results) => {
//           if (err) throw err;
//           console.log(`Результат shortenedDay_enabled: ${JSON.stringify(results)}`);
//           let shortenedDay_enabled = JSON.stringify(results)

//           // 
//           let sql = "SELECT * FROM melodies";
//           db.query(sql, (err, results) => {
//             if (err) throw err;
//             console.log(`Результат melodies: ${JSON.stringify(results)}`);
//             let melodies = JSON.stringify(results)

//             res.send({
//               weekdays,
//               saturday,
//               shortenedDay,
//               melodies,
//               shortenedDay_enabled
//             })
//           });
//         });
//       });
//     });
//   });
// });

// app.put('', async (rep, res) => {
   
// });

// let x
// app.get('/e', async (req, res) => {
//   let sql = `SELECT * FROM schedule`;
//   db.query(sql, (err, results) => {
//     if (err) throw err;
//     x = JSON.stringify(results)
//   });
//   res.send(`Звонки получены: { ${x} }`);
// });




