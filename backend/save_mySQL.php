<?php
// Получение данных из запроса
$data = json_decode(file_get_contents("/save_mySQL.php"));

$link = mysqli_connect('web.kioskapi.site', 'call_web_op9', '4o2GKUNA9ULMJ277', 'call_web_op9');

// Кодеравка
mysqli_set_charset($link, "utf8");

if ($link == false) {
  echo json_encode(["error" => "Ошибка: Невозможно подключиться к MySQL"]);
  exit;
}
// Очистка таблицы БД
$link->query("TRUNCATE TABLE `Schedule`");


// Обновление данных в базе данных
foreach ($data as $row) {
  $request = $link->query("INSERT INTO `Schedule` (`timeBeginning`, `timeEnd`, `сheckСall`, `melody`)
  VALUES ()");
}

// Ответ серверу
echo json_encode(["success" => true]);

// mysql_query()
