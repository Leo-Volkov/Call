<?php

// Получение данных из запроса
$data = json_decode(file_get_contents("/save"), true);

// Обновление данных в базе данных
foreach ($data as $row) {
  $stmt = $link->prepare("UPDATE Schedule SET timeBeginning = ?, timeEnd = ?, сheckСall = ?, melody = ?  WHERE ID = ?");
  $stmt->execute([$row["timeBeginning"], $row["timeEnd"], $row["сheckСall"], $row["melody"], $row["ID"]]);
}

// Ответ серверу
echo json_encode(["Schedule" => true]);

?>