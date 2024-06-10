## Структура базы данных звонков

**1. Создание базы данных "Call":**

**2. Создание таблицы `weekdays`:**

```sql
CREATE TABLE weekdays (
  id INT PRIMARY KEY AUTO_INCREMENT,
  enabled BOOLEAN NOT NULL,
  start_time TIME NOT NULL,
  end_time TIME NOT NULL
);
```

**3. Создание таблицы `saturday`:**

```sql
CREATE TABLE saturday (
  id INT PRIMARY KEY AUTO_INCREMENT,
  enabled BOOLEAN NOT NULL,
  start_time TIME NOT NULL,
  end_time TIME NOT NULL
);
```

**4. Создание таблицы `shortenedDay`:**

```sql
CREATE TABLE shortenedDay (
  id INT PRIMARY KEY AUTO_INCREMENT,
  enabled BOOLEAN NOT NULL,
  start_time TIME NOT NULL,
  end_time TIME NOT NULL
);
```

**5. Создание таблицы `melodies`:**

```sql
CREATE TABLE melodies (
  id INT PRIMARY KEY AUTO_INCREMENT,
  title VARCHAR(255) NOT NULL,
  enabled BOOLEAN NOT NULL
);
```

**6. Создание таблицы `types`:**

```sql
CREATE TABLE types (
  id INT PRIMARY KEY AUTO_INCREMENT,
  type VARCHAR(255) NOT NULL,
  enabled BOOLEAN NOT NULL
);
```

#### Таблица времени звонков на будние дни (weekdays):
```json
{
  "id": Number,
  "enabled": Boolean,
  "start_time": time,
  "end_time": time
}
```

#### Таблица времени звонков на Субботу (saturday):

```json
{
  "id": Number,
  "enabled": Boolean,
  "start_time": time,
  "end_time": time
}
```

#### Таблица времени звонков на Сокращённый день (shortenedDay):
```json
{
  "id": Number,
  "enabled": Boolean,
  "start_time": time,
  "end_time": time
}
```

#### Таблица мелодий звонков (melodies):
```json
{
  "id": Number,
  "title": String,
  "enabled": Boolean
}
```

#### Таблица типов расписания (types):
```json
{
  "id": Number,
  "type": String,
  "enabled": Boolean
}
```

---

## API-архитектура

### Отображение расписания
`GET:` `/user/schedule`
Добавление расписание по назвони таблицы и получить действующею мелодию
`1 SQL-запрос:`
```sql
SELECT type FROM types WHERE enabled = true
```
`2 SQL-запрос:`
```sql
SELECT * FROM ${schedule_type}
```
`3 SQL-запрос:`
```sql
SELECT * FROM melodies WHERE enabled = true
```
```json
получение {
  schedule: {
    "id": Number,
    "enabled": Boolean,
    "start_time": time,
    "end_time": time
  },
  melodies: {
    "title": String,
  }
}
```

#### Проверка пароля
`POST` `/login`
```json
body {
  "value_password": String
}
```
```json
получение {
  "api-key": String
}
```
#### Отображение расписания на странице редактирования 
`GET` `/admin/schedule`
`1 SQL-запрос:`
```sql
SELECT * FROM weekdays
```
`2 SQL-запрос:`
```sql
SELECT * FROM saturday
```
`3 SQL-запрос:`
```sql
SELECT * FROM shortenedDay
```
`4 SQL-запрос:`
```sql
-- достать enabled в таблице types у страки с type = shortenedDay 
SELECT enabled FROM types WHERE type = 'shortenedDay';
```
`5 SQL-запрос:`
```sql
SELECT * FROM melodies
```

```json
получение {
  weekdays: {
    "id": Number,
    "enabled": Boolean,
    "start_time": time,
    "end_time": time
  },
  saturday: {
    "id": Number,
    "enabled": Boolean,
    "start_time": time,
    "end_time": time
  },
  shortenedDay: {
    "id": Number,
    "enabled": Boolean,
    "start_time": time,
    "end_time": time
  },
  melodies: {
    "id": Number,
    "title": String,
    "enabled": Boolean
  },
  "shortenedDay_enabled": Boolean
}
```

#### Изменение расписания
`PUT` `/admin/schedule`
```json
bodu {
  weekdays: {
    "id": Number,
    "enabled": Boolean,
    "start_time": time,
    "end_time": time
  },
  saturday: {
    "id": Number,
    "enabled": Boolean,
    "start_time": time,
    "end_time": time
  },
  shortenedDay: {
    "id": Number,
    "enabled": Boolean,
    "start_time": time,
    "end_time": time
  },
  melodies: {
    "id": Number,
    "title": String,
    "enabled": Boolean
  },
  "shortenedDay": Boolean
}
```
`1 SQL-запрос:` 
```sql
UPDATE weekdays
SET enabled = ${bodu.weekdays.enabled},
    start_time = ${bodu.weekdays.start_time},
    end_time = ${bodu.weekdays.end_time}
WHERE id = ${bodu.weekdays.id};
```
`2 SQL-запрос:`
```sql
UPDATE saturday
SET enabled = ${bodu.saturday.enabled},
    start_time = ${bodu.saturday.start_time},
    end_time = ${bodu.saturday.end_time}
WHERE id = ${bodu.saturday.id};

```
`3 SQL-запрос:`
```sql
UPDATE shortenedDay
SET enabled = ${bodu.shortenedDay.enabled},
    start_time = ${bodu.shortenedDay.start_time},
    end_time = ${bodu.shortenedDay.end_time}
WHERE id = ${bodu.shortenedDay.id};
```
`4 SQL-запрос:`
```sql
INSERT INTO melodies (id, title, enabled)
VALUES (${bodu.melodies.id}, ${bodu.melodies.title}, ${bodu.melodies.enabled})
ON DUPLICATE KEY UPDATE
    title = ${bodu.melodies.title},
    enabled = ${bodu.melodies.enabled};
```
`5 SQL-запрос:`
```sql
UPDATE types SET enabled = ${shortenedDay.enabled} WHERE id = 3
```

#### Добавление мелодии
`POST` `/admin/melody/{title}`
`SQL-запрос:`
```sql
INSERT INTO `melodies` (`id`, `title`, `enabled`) VALUES (NULL, '${title}', '1');
```

#### Удалить милодию мелодии
`DELETE` `/admin/melody/{id}`
`SQL-запрос:` 
```sql
DELETE FROM melodies WHERE `melodies`.`id` = ${id}
```