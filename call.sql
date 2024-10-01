-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Хост: 127.0.0.1
-- Время создания: Окт 01 2024 г., 10:19
-- Версия сервера: 10.4.32-MariaDB
-- Версия PHP: 8.0.30

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
  `title` varchar(255) DEFAULT NULL,
  `enabled` tinyint(1) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Дамп данных таблицы `melodies`
--

INSERT INTO `melodies` (`id`, `title`, `enabled`) VALUES
(1, 'Трам-пам', 1);

-- --------------------------------------------------------

--
-- Структура таблицы `saturdays`
--

CREATE TABLE `saturdays` (
  `call_id` int(11) NOT NULL,
  `enabled` tinyint(1) DEFAULT 1,
  `start_time` time DEFAULT NULL,
  `end_time` time DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Дамп данных таблицы `saturdays`
--

INSERT INTO `saturdays` (`call_id`, `enabled`, `start_time`, `end_time`) VALUES
(1, 1, '09:00:00', '09:45:00'),
(2, 1, '09:55:00', '10:40:00'),
(3, 1, '11:00:00', '11:45:00'),
(4, 1, '11:55:00', '12:40:00'),
(5, 1, '12:50:00', '13:35:00'),
(6, 1, '13:45:00', '14:30:00'),
(7, 1, '14:40:00', '15:25:00'),
(8, 1, '15:35:00', '16:20:00'),
(9, 1, '16:30:00', '17:15:00'),
(10, 1, '17:25:00', '18:10:00');

-- --------------------------------------------------------

--
-- Структура таблицы `shorteneddays`
--

CREATE TABLE `shorteneddays` (
  `call_id` int(11) NOT NULL,
  `enabled` tinyint(1) DEFAULT 1,
  `start_time` time DEFAULT NULL,
  `end_time` time DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Дамп данных таблицы `shorteneddays`
--

INSERT INTO `shorteneddays` (`call_id`, `enabled`, `start_time`, `end_time`) VALUES
(1, 1, '11:00:00', '11:45:00'),
(2, 1, '12:00:00', '12:45:00');

-- --------------------------------------------------------

--
-- Структура таблицы `types`
--

CREATE TABLE `types` (
  `id` int(11) NOT NULL,
  `type` varchar(255) DEFAULT NULL,
  `enabled` tinyint(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Дамп данных таблицы `types`
--

INSERT INTO `types` (`id`, `type`, `enabled`) VALUES
(1, 'weekdays', 1),
(2, 'saturday', 1),
(3, 'shortenedDay', 0);

-- --------------------------------------------------------

--
-- Структура таблицы `users_admins`
--

CREATE TABLE `users_admins` (
  `id` int(11) NOT NULL,
  `logen` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Дамп данных таблицы `users_admins`
--

INSERT INTO `users_admins` (`id`, `logen`, `password`) VALUES
(1, 'admin', '123321');

-- --------------------------------------------------------

--
-- Структура таблицы `weekdays`
--

CREATE TABLE `weekdays` (
  `call_id` int(11) NOT NULL,
  `enabled` tinyint(1) DEFAULT NULL,
  `start_time` time DEFAULT NULL,
  `end_time` time DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Дамп данных таблицы `weekdays`
--

INSERT INTO `weekdays` (`call_id`, `enabled`, `start_time`, `end_time`) VALUES
(1, 1, '09:00:00', '09:45:00'),
(2, 1, '09:55:00', '10:40:00'),
(3, 1, '11:00:00', '11:45:00'),
(4, 1, '11:55:00', '12:40:00'),
(5, 1, '13:00:00', '13:45:00'),
(6, 1, '14:05:00', '14:50:00'),
(7, 1, '15:10:00', '15:55:00'),
(8, 1, '16:05:00', '16:50:00'),
(9, 1, '17:00:00', '17:45:00'),
(10, 1, '17:55:00', '18:40:00'),
(11, 1, '18:50:00', '19:35:00');

--
-- Индексы сохранённых таблиц
--

--
-- Индексы таблицы `melodies`
--
ALTER TABLE `melodies`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `saturdays`
--
ALTER TABLE `saturdays`
  ADD PRIMARY KEY (`call_id`);

--
-- Индексы таблицы `shorteneddays`
--
ALTER TABLE `shorteneddays`
  ADD PRIMARY KEY (`call_id`);

--
-- Индексы таблицы `types`
--
ALTER TABLE `types`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `users_admins`
--
ALTER TABLE `users_admins`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `weekdays`
--
ALTER TABLE `weekdays`
  ADD PRIMARY KEY (`call_id`);

--
-- AUTO_INCREMENT для сохранённых таблиц
--

--
-- AUTO_INCREMENT для таблицы `melodies`
--
ALTER TABLE `melodies`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT для таблицы `types`
--
ALTER TABLE `types`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT для таблицы `users_admins`
--
ALTER TABLE `users_admins`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
