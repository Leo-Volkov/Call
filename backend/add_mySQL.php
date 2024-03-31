<?php

$link = mysqli_connect('web.kioskapi.site', 'call_web_op9', '4o2GKUNA9ULMJ277', 'call_web_op9');

// Задаю кодеравку 
mysqli_set_charset($link, "utf8");

if ($link == false) {
    print("Ошибка: Невозможно подключиться к MySQL <br>" . mysqli_connect_error());
}


$sql = 'SELECT * FROM `Schedule`';

$result = mysqli_query($link, $sql);
$rows = mysqli_fetch_all($result, MYSQLI_ASSOC);

echo json_encode($rows);

?>