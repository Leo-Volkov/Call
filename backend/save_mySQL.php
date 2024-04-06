<?php

$link = mysqli_connect('web.kioskapi.site', 'call_web_op9', '4o2GKUNA9ULMJ277', 'call_web_op9');

// Задаю кодеравку
mysqli_set_charset($link, "utf8");

if ($link == false) {
    echo json_encode(["error" => "Ошибка: Невозможно подключиться к MySQL"]);
    exit;
}

// Получение данных из запроса
$data = json_decode(file_get_contents("/save"), true);

// Обновление данных в базе данных
foreach ($data as $row) {
    $stmt = $link->prepare("UPDATE Schedule SET timeBeginning = ?, timeEnd = ?, сheckСall = ?, melody = ? WHERE ID = ?");

    // Связывание параметров
    $stmt->bind_param("Schedule", $row["timeBeginning"], $row["timeEnd"], $row["сheckСall"], $row["melody"], $row["ID"]);

    if (!$stmt->execute()) {
        echo json_encode(["error" => "Ошибка: " . mysqli_error($link)]);
        exit;
    }
}

// Ответ серверу
echo json_encode(["success" => true]);

?>