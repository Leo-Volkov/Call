// Инпорт библеотек
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
  ;(async () => {
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
const Users = sequelize.define(
  'users',
  {
    logen: DataTypes.STRING,
    password: DataTypes.STRING,
  },
  {
    timestamps: false,
  },
)

// ;(async () => { // эта строка существует для автоматизации создания таблиц в базе даных
//   await sequelize.sync()  // Создаёт таблицы, если их нет
//   await sequelize.sync({ alter: true })
//   console.log('Таблицы созданы') //INSERT INTO `types`(`id`, `type`, `enabled`) VALUES ('1', 'weekdays', '1'), ('2', 'saturday', '1'), ('3', 'shortenedDay', '0') 
// })()


// запросы
// Отправка расписания пользователю
app.get('/user/schedule', async (rep, res) => {
  const data = {
    schedule_type: '',
  }

  // получение типа расписаиния
  const types = await Types.findAll({
    attributes: ['id'],
    where: {
      enabled: 1,
    },
  })
  let type = JSON.stringify(types)
  if (type[0].id == 3) {
    data.schedule_type = 'ShortenedDay'
  } else {
    let Dat = new Date()
    if (Dat.getDay() == 6) {
      data.schedule_type = 'Saturday'
    } else if (Dat.getDay() == 0) {
      // Воскрисение: звонки и расписание отключено
      res.send('OFF')
    } else {
      data.schedule_type = 'Weekdays'
    }
  }

  // Получение расписания звонков
  let schedule
  if (data.schedule_type === 'ShortenedDay') {
    schedule = await ShortenedDay.findAll()
  } else if (data.schedule_type === 'Saturday') {
    schedule = await Saturday.findAll()
  } else if (data.schedule_type === 'Weekdays') {
    schedule = await Weekdays.findAll()
  }

  // Получение милодии звонка
  const melodie = await Melodies.findAll({
    attributes: ['title'],
    where: {
      enabled: 1,
    },
  })

  // Отправка данных пользователю
  res.send({ melodie, schedule })
})

// Индификация на прова к администрации
app.post('/login/verification', async (req, res) => {
  const value_password = req.body.value_password
  const value_logen = req.body.value_logen

  try {
    const resurs = await Users.findAll({
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
  const weekdays = await Weekdays.findAll()
  const saturday = await Saturday.findAll()
  const shortenedDay = await ShortenedDay.findAll()
  const shortenedDay_enabled = await Types.findOne({
    attributes: ['enabled'],
    where: {
      type: 'shortenedDay',
    },
  })
  const melodies = await Melodies.findAll()

  res.send({
    weekdays,
    saturday,
    shortenedDay,
    melodies,
    shortenedDay_enabled,
  })
})
