-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Хост: 127.0.0.1
-- Время создания: Май 08 2024 г., 17:34
-- Версия сервера: 10.4.32-MariaDB
-- Версия PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- База данных: `call`
--

-- --------------------------------------------------------

--
-- Структура таблицы `melodies`
--

CREATE TABLE `melodies` (
  `id` int(11) NOT NULL,
  `name` text DEFAULT NULL,
  `enabled` tinyint(1) NOT NULL,
  `src` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Дамп данных таблицы `melodies`
--

INSERT INTO `melodies` (`id`, `name`, `enabled`, `src`) VALUES
(1, 'Дзынь-дзынь', 1, 'Дзынь');

-- --------------------------------------------------------

--
-- Структура таблицы `schedule`
--

CREATE TABLE `schedule` (
  `id` int(11) NOT NULL,
  `number` int(2) NOT NULL,
  `type_id` int(11) NOT NULL,
  `startTime` time NOT NULL,
  `endTime` time NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Дамп данных таблицы `schedule`
--

INSERT INTO `schedule` (`id`, `number`, `type_id`, `startTime`, `endTime`) VALUES
(1, 1, 1, '09:00:00', '09:45:00'),
(2, 2, 1, '09:55:00', '10:40:00'),
(3, 3, 1, '11:00:00', '11:45:00'),
(4, 4, 1, '11:55:00', '12:40:00'),
(5, 5, 1, '13:00:00', '13:45:00'),
(6, 6, 1, '14:05:00', '14:50:00'),
(7, 7, 1, '15:10:00', '15:55:00'),
(8, 8, 1, '16:05:00', '16:50:00'),
(9, 1, 2, '09:00:00', '09:45:00'),
(10, 2, 2, '09:55:00', '10:40:00'),
(11, 3, 2, '10:50:00', '11:35:00'),
(12, 4, 2, '11:45:00', '12:30:00'),
(13, 5, 2, '12:40:00', '13:25:00'),
(14, 1, 3, '09:00:00', '09:35:00'),
(15, 2, 3, '09:40:00', '10:15:00'),
(16, 3, 3, '10:20:00', '10:55:00');

-- --------------------------------------------------------

--
-- Структура таблицы `type_schedule`
--

CREATE TABLE `type_schedule` (
  `id` int(11) NOT NULL,
  `name` text DEFAULT NULL,
  `selected` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Дамп данных таблицы `type_schedule`
--

INSERT INTO `type_schedule` (`id`, `name`, `selected`) VALUES
(1, 'Расписание на будни', 1),
(2, 'Расписание на субботу', 1),
(3, 'Сокращённый день', 0);

--
-- Индексы сохранённых таблиц
--

--
-- Индексы таблицы `melodies`
--
ALTER TABLE `melodies`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `schedule`
--
ALTER TABLE `schedule`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `type_schedule`
--
ALTER TABLE `type_schedule`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT для сохранённых таблиц
--

--
-- AUTO_INCREMENT для таблицы `melodies`
--
ALTER TABLE `melodies`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT для таблицы `schedule`
--
ALTER TABLE `schedule`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT для таблицы `type_schedule`
--
ALTER TABLE `type_schedule`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
