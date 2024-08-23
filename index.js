// Инпорт библеотек
// const dayjs = require('dayjs')
const express = require(`express`)
const app = express()
const { Sequelize, DataTypes, Model } = require('sequelize')

// Создание порта
const port = 3005
app.listen(port, () => {
  console.log(`server: ${port}`)
})

// Настройки cors
let cors = require('cors')
app.use(
  cors({
    origin: 'http://localhost:5173',
  }),
)

// Настройка POST-запроса — JSON
app.use(express.json())

// Подключение Базы Данных
const sequelize = new Sequelize(
  'Call',
  'root',
  '',
  {
    host: '127.0.0.1',
    dialect: 'mysql',
  },
  {
    // Установка глобальных правел
    define: {
      freezeTableName: true,
    },
  },
)

// Проверка ощибок при подключении к БД
try {
  ; (async () => {
    await sequelize.authenticate()
  })() //
  console.log('Соединение успешно установлено.')
} catch (error) {
  console.error('Невозможно подключиться к базе данных: ', error)
}

// Создание моделей БД
const Weekdays = sequelize.define(
  'weekdays',
  {
    call_id: {
      type: DataTypes.INTEGER,
      key: 'id',
      primaryKey: true,
    },
    enabled: {
      type: DataTypes.BOOLEAN,
    },
    start_time: DataTypes.TIME,
    end_time: DataTypes.TIME,
  },
  {
    timestamps: false,
  },
)
const Saturday = sequelize.define(
  'saturdays',
  {
    call_id: {
      type: DataTypes.INTEGER,
      key: 'id',
      primaryKey: true,
    },
    enabled: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    start_time: DataTypes.TIME,
    end_time: DataTypes.TIME,
  },
  {
    timestamps: false,
  },
)
const ShortenedDay = sequelize.define(
  'shortenedDays',
  {
    call_id: {
      type: DataTypes.INTEGER,
      key: 'id',
      primaryKey: true,
    },
    enabled: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    start_time: DataTypes.TIME,
    end_time: DataTypes.TIME,
  },
  {
    timestamps: false,
  },
)
const Melodies = sequelize.define(
  'melodies',
  {
    title: DataTypes.STRING,
    enabled: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    timestamps: false,
  },
)
const Types = sequelize.define(
  'types',
  {
    type: DataTypes.STRING,
    enabled: DataTypes.BOOLEAN,
  },
  {
    timestamps: false,
  },
)
const UsersAdmin = sequelize.define(
  'users_admin',
  {
    logen: DataTypes.STRING,
    password: DataTypes.STRING,
  },
  {
    timestamps: false,
  },
)

; (async () => {
  const ifShortenedDay = await Types.findOne({
    attributes: ['id'],
    where: {
      type: 'shortenedDay',
    },
  });
  if ( ifShortenedDay == null || ifShortenedDay.id  != 3 ) await sequelize.query("INSERT INTO `types`(`id`, `type`, `enabled`) VALUES ('1', 'weekdays', '1'), ('2', 'saturday', '1'), ('3', 'shortenedDay', '0')");
  await sequelize.sync(); // Создаёт таблицы, если их нет
  await sequelize.sync({ alter: true });
  console.log('Таблицы созданы'); 
})()

// запросы
// Отправка расписания пользователю
app.get('/user/schedule', async (rep, res) => { 
  let schedule_type = ''

  // получение типа расписаиния
  const types = await Types.findAll({
    attributes: ['id'],
    where: {
      enabled: 1,
    },
  })
  if (types[0].id == 3) {
    schedule_type = 'ShortenedDay'
  } else {
    let Dat = new Date()
    if (Dat.getDay() == 6) {
      schedule_type = 'Saturday'
    } else if (Dat.getDay() == 0) {
      // Воскрисение: звонки и расписание отключено
      res.send()
      return
    } else {
      schedule_type = 'Weekdays'
    }
  }

  // Получение расписания звонков
  let timetable
  if (schedule_type === 'ShortenedDay') {
    timetable = received_1_formattingData_time(await ShortenedDay.findAll())
  } else if (schedule_type === 'Saturday') {
    timetable = received_1_formattingData_time(await Saturday.findAll())
  } else if (schedule_type === 'Weekdays') {
    timetable = received_1_formattingData_time(await Weekdays.findAll())
  }

  // Получение милодии звонка
  const melodie = await Melodies.findAll({
    attributes: ['title'],
    where: {
      enabled: 1,
    },
  })
  const timeCall = get_array_timetable_call(timetable)
  // Отправка данных пользователю
  res.send({ melodie: melodie[0].title, timetable: timetable, timeCall })
})

// Индификация на прова к администрации
app.post('/login/verification', async (req, res) => {
  const value_password = req.body.value_password
  const value_logen = req.body.value_logen

  try {
    const resurs = await UsersAdmin.findAll({
      where: {
        logen: value_logen,
      },
    })
    if (resurs == 0) {
      res.send(false)
    } else {
      if (value_password === resurs[0].password && value_logen === resurs[0].logen) {
        res.send(true)
      } else {
        res.send(false)
      }
    }
  } catch (error) {
    res.send({
      error,
      mesendg: `Ощибка: ${error}`,
    })
  }
})

// Отправка данных в админку
app.get('/admin/schedule', async (rep, res) => {
  // эта строка существует для автоматизации создания таблиц в базе даных
  
  

  const weekdays = received_1_formattingData_time(await Weekdays.findAll());
  const saturday = received_1_formattingData_time(await Saturday.findAll());
  const shortenedDay = received_1_formattingData_time(await ShortenedDay.findAll());
  const melodies = await Melodies.findAll();
  const melodie_id = await Melodies.findAll({
    attributes: ['id'],
    where: {
      enabled: 1,
    },
  });
  const shortenedDay_enabled = await Types.findOne({
          attributes: ['enabled'],
          where: {
            type: 'shortenedDay',
          },
        });

  res.send({
    weekdays,
    saturday,
    shortenedDay,
    melodies,
    melodie_id: melodie_id[0].id,
    shortenedDay_enabled: shortenedDay_enabled.enabled,
  })
})

app.post('/admin/save_DB', async (rep, res) => {
  const weekdays = received_2_formattingData_time(rep.body.weekdays);
  const saturday = received_2_formattingData_time(rep.body.saturday);
  const shortenedDay = received_2_formattingData_time(rep.body.shortenedDay);
  const melodies = rep.body.melodies;
  const melodie_id = rep.body.melodie_id;
  const shortenedDay_enabled = rep.body.shortenedDay_enabled;



  melodies.forEach((element) => {
    if (element.enabled === true) element.enabled = false;
  });
  melodies.forEach((element, index) => {
    if (melodie_id - 1 === index) element.enabled = true;
  });
  await Weekdays.destroy({
    truncate: true,
  });
  await Weekdays.bulkCreate(weekdays);
  
  await Saturday.destroy({
    truncate: true,
  })
  await Saturday.bulkCreate(saturday);
  
  await ShortenedDay.destroy({
    truncate: true, 
  });
  await ShortenedDay.bulkCreate(shortenedDay);

  await Melodies.destroy({
    truncate: true,
  });
  await Melodies.bulkCreate(melodies);
  if (shortenedDay_enabled === true) {
    await Types.update(
      { enabled: false },
      { where: { type: 'weekdays' } }
    );
    await Types.update(
      { enabled: false },
      { where: { type: 'saturday' } }
    );
    await Types.update(
      { enabled: true },
      { where: { type: 'shortenedDay' } }
    );
  } else {
    await Types.update(
      { enabled: true },
      { where: { type: 'weekdays' } }
    );
    await Types.update(
      { enabled: true },
      { where: { type: 'saturday' } }
    );
    await Types.update(
      { enabled: false },
      { where: { type: 'shortenedDay' } }
    );
  };

  res.send({
    weekdays,
    saturday,
    shortenedDay,
    melodies,
    melodie_id,
    shortenedDay_enabled,
  });

})

// Функции
function received_1_formattingData_time(table) {
  table.forEach((element) => {
    element.start_time = element.start_time.slice(0, 5)
    element.end_time = element.end_time.slice(0, 5)
  })
  return table
}

function received_2_formattingData_time(table) {
  table.forEach((element) => {
    element.start_time = element.start_time + ':00'
    element.end_time = element.end_time + ':00'
  })
  return table
}

function get_array_timetable_call(new_table) {
  let table = received_1_formattingData_time(new_table)
  const timeCall = {
    time: [],
    timetable: [],
  }

  const start_Lesson_1 = []
  const end_Lesson = []
  const start_Lesson_2 = []
  table.forEach((element, index) => {
    let startTime
    index - 1 === -1 ? (startTime = element.start_time) : (startTime = table[index - 1].end_time)

    // Разбиваем время на часы и минуты
    const startPart = startTime.split(':')
    const endPart = element.end_time.split(':')
    const timePart = element.start_time.split(':')

    // Преобразуем в минуты
    start_Lesson_1[index] = startPart[0] * 60 + parseInt(startPart[1])
    end_Lesson[index] = endPart[0] * 60 + parseInt(endPart[1])
    start_Lesson_2[index] = timePart[0] * 60 + parseInt(timePart[1])

    timeCall.timetable.push({
      start_Lesson: start_Lesson_2[index],
      end_Lesson: end_Lesson[index],
    })
  })
  timeCall.time.push(...start_Lesson_1, ...end_Lesson, ...start_Lesson_2)
  timeCall.time = ((arr) => [...new Set(arr)])(timeCall.time).sort()

  return timeCall
}
