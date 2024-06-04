### Структура базы данных звонков

##### Таблица времени звонков на будние дни (weekdays):

```
{
  "id": Number,
  "call_sequence_number": Number,
  "college_id": Number,
  "whether_ringer_is_on": Boolean,
  "lesson_start_time": time,
  "lesson_end_time": time
}
```

##### Таблица времени звонков на Субботу (saturday):

```
{
  "id": Number,
  "call_sequence_number": Number,
  "college_id": Number,
  "whether_ringer_is_on": Boolean,
  "lesson_start_time": time,
  "lesson_end_time": time
}
```

##### Таблица времени звонков на Сокращённый день (shortenedDay):

```
{
  "id": Number,
  "call_sequence_number": Number,
  "college_id": Number,
  "whether_ringer_is_on": Boolean,
  "lesson_start_time": time,
  "lesson_end_time": time
}
```

##### Таблица мелодий звонков (melodies):

```
{
  "id": Number,
  "title": String,
  "whether": Boolean
}
```

---

### API-архитектура

##### Отображение расписания
`GET:` `/user/schedule/get`
Добавление расписание по назвони таблицы и получить действующею мелодию
```
query {
  college_id: Number
}
```
`1 SQL-запрос:` `"SELECT *
FROM ${schedule_type} WHERE college_id = ${college_id}"`
`2 SQL-запрос:` `"SELECT *
FROM melodies WHERE whether = true"`
```
получение {
  schedule: [{
      "call_sequence_number": Number,
      "whether_ringer_is_on": Boolean,
      "lesson_start_time": time,
      "lesson_end_time": time
    }],
  melodies: {
    "title": String,
    "whether": true
  }
}
```

##### Проверка пароля
`POST` `/login/verification`
```
bodu {
  value_password: String
}
```
```
получение {
  Boolean
}
```
##### Отображение расписания для изменения
`GET:` `/admin/schedule/get`
```
query {
  college_id: Number
}
```
```
получение {
  schedule: [{
      "call_sequence_number": Number,
      "whether_ringer_is_on": Boolean,
      "lesson_start_time": time,
      "lesson_end_time": time
    }],
  melodies: [{
    "title": String,
    "whether": Boolean
  }]
}
```

##### Изменение расписания
`PUT` `/admin/schedule/modify`
```
bodu {
  schedule: [{
      "call_sequence_number": Number,
      "college_id": Number,
      "whether_ringer_is_on": Boolean,
      "lesson_start_time": time,
      "lesson_end_time": time
    }],
  melodies: [{
    "title": String,
    "whether": Boolean
  }]
}
```

##### Добавление мелодии
`GET` `/admin/melody/add`
```
bodu {
  "title": String
}
```
