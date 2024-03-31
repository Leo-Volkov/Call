<?php
$value_password = $_GET["value_password"];
if ($value_password === '123321') {
    echo json_encode(true);
} else {
    echo json_encode(false);
}
?>