### Структура базы данных звонко

##### Таблица времени звонков на будние дни (weekdays):

```
{
	"id": Number,
	"call_sequence_number": Number,
	"college_id": Number,
  "Whether_ringer_is_on": Boolean,
	"Lesson_start_time": time,
	"Lesson_end_time": time
}
```

##### Таблица времени звонков на Субботу (saturday):

```
{
	"id": Number,
	"call_sequence_number": Number,
	"college_id": Number,
  "Whether_ringer_is_on": Boolean,
	"Lesson_start_time": time,
	"Lesson_end_time": time
}
```

##### Таблица времени звонков на Сокращённый день (shortenedDay):

```
{
	"id": Number,
	"call_sequence_number": Number,
	"college_id": Number,
  "Whether_ringer_is_on": Boolean,
	"Lesson_start_time": time,
	"Lesson_end_time": time
}
```

##### Таблица мелодий звонков (melodies):

```
{
  "id": Number,
  "title": String,
  "whether": Boolean,
  "src": String
}
```

---

### API-архитектура

##### Отображение расписания
`GET:` `/user/getSchedule`
Добавление расписание по назвинии таблици и получить действующию милодию
```
bodu {
  
}
```
`1 SQL-запрос:` `"SELECT *
FROM ${тип_расписания} WHERE organization_name = ${название_колледж}"`
`2 SQL-запрос:` `"SELECT *
FROM melodies WHERE whether = true"`
```
получение {
  
}
```

##### Проверка пароля
`POST` `/login/verification`

##### Отображение расписания на изменение
`GET:` `/admin/getSchedule`

##### Изменение расписания
`GET` `/admin/rescheduling`