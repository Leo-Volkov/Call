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



// Получение данных из запроса
$data = json_decode(file_get_contents("/save"), true);

// Обновление данных в базе данных
foreach ($data as $row) {
  $stmt = $link->prepare("UPDATE Schedule SET timeBeginning = ?, timeEnd = ?, сheckСall = ?, melody = ?  WHERE ID = ?");
  $stmt->execute([$row["timeBeginning"], $row["timeEnd"], $row["сheckСall"], $row["melody"], $row["ID"]]);
}

// Ответ серверу
echo json_encode(["Schedule" => true]);


// Получение пароль из запроса
$password = json_decode(file_get_contents("/verification"), true);
// $password = password_hash($password, PASSWORD_DEFAULT);

if ($password == "123") {
  echo json_encode(['success' => true]);
} else {
  echo json_encode(['success' => false]);
}

?>