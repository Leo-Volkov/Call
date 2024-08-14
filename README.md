# Проект расписания звонков

## Рекомендуемая настройка IDE

1. [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar)

## Настройка проекта
```sh
npm install
```

### Локальный запуск кода
<u>Запуск Vue</u>: `npm run dev`
<u>Запуск сервера</u>: `npm run start`

### URL-адреса 
`http://localhost:5173` - Расписание звонков
`http://localhost:5173/admin` - Панель администрации для изменения расписания
`http://localhost:5173/login`

### БД
1. Создаёте БД в MySQL по имени `Call`
2. переходите по адресу `http://localhost:5173/admin` и там автоматически создаются таблицы
или 
импортируете файл из репозитория: `Call.sql`


### Компиляция и минификация для производства
```sh
npm run build
```
