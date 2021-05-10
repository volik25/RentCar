-- phpMyAdmin SQL Dump
-- version 4.9.1
-- https://www.phpmyadmin.net/
--
-- Хост: localhost
-- Время создания: Май 21 2020 г., 20:13
-- Версия сервера: 5.7.21-20-beget-5.7.21-20-1-log
-- Версия PHP: 5.6.40

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- База данных: `vdknf_volik`
--

-- --------------------------------------------------------

--
-- Структура таблицы `carOrders`
--
-- Создание: Май 20 2020 г., 03:02
-- Последнее обновление: Май 21 2020 г., 16:54
--

DROP TABLE IF EXISTS `carOrders`;
CREATE TABLE `carOrders` (
  `id` int(10) NOT NULL,
  `userId` int(10) NOT NULL,
  `carId` int(10) NOT NULL,
  `placeId` int(10) DEFAULT NULL,
  `dateFrom` date NOT NULL,
  `dateTo` date DEFAULT NULL,
  `time` varchar(50) NOT NULL,
  `orderSum` int(10) NOT NULL,
  `status` int(2) DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `carOrders`
--

INSERT INTO `carOrders` (`id`, `userId`, `carId`, `placeId`, `dateFrom`, `dateTo`, `time`, `orderSum`, `status`) VALUES
(3, 2, 1, 2, '2020-05-22', '2020-05-25', '20:00', 10000, 4),
(4, 2, 9, 3, '2020-05-29', '2020-06-01', '21:00', 14400, 1),
(9, 2, 13, 6, '2020-05-14', '2020-05-16', '15:00', 5400, 3);

-- --------------------------------------------------------

--
-- Структура таблицы `cars`
--
-- Создание: Май 17 2020 г., 12:38
-- Последнее обновление: Май 20 2020 г., 17:58
--

DROP TABLE IF EXISTS `cars`;
CREATE TABLE `cars` (
  `id` int(10) NOT NULL,
  `img` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `description` text NOT NULL,
  `price` int(10) NOT NULL,
  `bodyType` int(11) NOT NULL,
  `fuelType` int(11) NOT NULL,
  `fuelCity` float DEFAULT NULL,
  `fuelTrack` float DEFAULT NULL,
  `enginePower` int(10) DEFAULT NULL,
  `engineVolume` float DEFAULT NULL,
  `maxSpeed` float DEFAULT NULL,
  `accelerationTime` float DEFAULT NULL,
  `kpp` int(11) NOT NULL,
  `gears` int(11) DEFAULT NULL,
  `wheelDrive` int(11) DEFAULT NULL,
  `doors` int(11) NOT NULL,
  `sits` int(11) NOT NULL,
  `airbags` int(11) DEFAULT NULL,
  `AC` tinyint(1) NOT NULL,
  `steering` int(11) NOT NULL,
  `trunkVolume` float DEFAULT NULL,
  `createYear` int(4) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `cars`
--

INSERT INTO `cars` (`id`, `img`, `name`, `description`, `price`, `bodyType`, `fuelType`, `fuelCity`, `fuelTrack`, `enginePower`, `engineVolume`, `maxSpeed`, `accelerationTime`, `kpp`, `gears`, `wheelDrive`, `doors`, `sits`, `airbags`, `AC`, `steering`, `trunkVolume`, `createYear`) VALUES
(1, 'http://vdknf.beget.tech/RentCarBack/Files/5ebfc098146ec_bXirz1JihR0.jpg', 'Citroen C5', 'Качественный французский бизнес-класс', 2500, 1, 95, 10.1, 8.7, 145, 1.6, 250, 8.5, 2, 7, 1, 4, 5, 8, 2, 1, 450, 2012),
(9, 'http://vdknf.beget.tech/RentCarBack/Files/5ec29ca3105e2_audiA6.jpg', 'Audi A6 AVANT', 'Отличный автомобиль для любителей быстрой езды и большого багажника!', 4800, 3, 98, 12.3, 10.1, 450, 3, 320, 4.6, 4, 8, 3, 5, 5, 12, 3, 1, 900, 2019),
(10, 'http://vdknf.beget.tech/RentCarBack/Files/5ec29d265599e_glc.jpg', 'Mercedes-Benz GLC Coupe', 'Спортивный кроссовер премиум-бренда', 8200, 5, 98, 13.4, 11.4, 275, 3.6, 280, 7.2, 2, 9, 3, 5, 5, 12, 3, 1, 700, 2018),
(11, 'http://vdknf.beget.tech/RentCarBack/Files/5ec29ffd56157_c-class.jpg', 'Mercedes-Benz C-Classe Coupe', 'Старый добрый спорт-купе от немецкого концерна с большой историей!', 3200, 5, 95, 11.6, 9.2, 230, 2.5, 250, 6.7, 1, 6, 2, 2, 2, 4, 2, 1, 250, 2008),
(12, 'http://vdknf.beget.tech/RentCarBack/Files/5ec2a09489683_jaguar.jpg', 'Jaguar F-Type', 'Свежая спорт-новинка от британского концерна Jaguar', 4900, 5, 100, 13.5, 8.5, 480, 5, 310, 3.6, 2, 9, 2, 2, 2, 4, 2, 1, 280, 2018),
(13, 'http://vdknf.beget.tech/RentCarBack/Files/5ec2a12b2c2a3_xray.jpg', 'Lada X-Ray', 'Компактный кроссовер от отечественного производителя', 1800, 2, 92, 10.5, 6.8, 106, 1.6, 170, 13.4, 1, 6, 1, 5, 5, NULL, 0, 1, 495, 2017),
(14, 'http://vdknf.beget.tech/RentCarBack/Files/5ec56fdbe7651_porsche.jpg', 'Porsche 911 Turbo S', 'Мощный и быстрый спорт-кар от легендарного итальянского производителя', 9200, 5, 98, 12.1, 9.2, 515, 3.4, 326, 3.1, 3, 8, 2, 2, 2, 4, 2, 1, 197, 2016);

-- --------------------------------------------------------

--
-- Структура таблицы `places`
--
-- Создание: Май 17 2020 г., 22:11
-- Последнее обновление: Май 20 2020 г., 09:35
--

DROP TABLE IF EXISTS `places`;
CREATE TABLE `places` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `places`
--

INSERT INTO `places` (`id`, `name`) VALUES
(2, 'Москва, м. Комсомольская'),
(3, 'Москва, м. ВДНХ'),
(4, 'Москва, м. Юго-Западная'),
(5, 'Москва, м. Семеновская'),
(6, 'МО, г. Пушкино, ул. Чехова, с. 16');

-- --------------------------------------------------------

--
-- Структура таблицы `users`
--
-- Создание: Май 18 2020 г., 05:54
-- Последнее обновление: Май 20 2020 г., 06:31
--

DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
  `id` int(10) NOT NULL,
  `isAdmin` bit(1) DEFAULT b'0',
  `name` varchar(255) NOT NULL,
  `surname` varchar(255) NOT NULL,
  `secondname` varchar(255) DEFAULT NULL,
  `email` varchar(255) NOT NULL,
  `phone` varchar(20) DEFAULT NULL,
  `password` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `users`
--

INSERT INTO `users` (`id`, `isAdmin`, `name`, `surname`, `secondname`, `email`, `phone`, `password`) VALUES
(1, b'1', 'Иван', 'Волик', 'Андреевич', 'i.a.volik@gmail.com', '', '$2y$10$sMlynSsspib9LIKLjjZP4eBNHOUY8AN/C5O7g4e6x395BsaRSxpce'),
(2, b'0', 'Виктория', 'Анюхина', '', 'viktoriya.anuyhina@yandex.ru', NULL, '$2y$10$teFrFX9ax/h3ocgQg9tsjevz5MK0S.CFMgc0IN.KgSmGVM7hUJGVm');

--
-- Индексы сохранённых таблиц
--

--
-- Индексы таблицы `carOrders`
--
ALTER TABLE `carOrders`
  ADD PRIMARY KEY (`id`),
  ADD KEY `userId` (`userId`),
  ADD KEY `carId` (`carId`),
  ADD KEY `placeId` (`placeId`);

--
-- Индексы таблицы `cars`
--
ALTER TABLE `cars`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `places`
--
ALTER TABLE `places`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT для сохранённых таблиц
--

--
-- AUTO_INCREMENT для таблицы `carOrders`
--
ALTER TABLE `carOrders`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT для таблицы `cars`
--
ALTER TABLE `cars`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT для таблицы `places`
--
ALTER TABLE `places`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT для таблицы `users`
--
ALTER TABLE `users`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- Ограничения внешнего ключа сохраненных таблиц
--

--
-- Ограничения внешнего ключа таблицы `carOrders`
--
ALTER TABLE `carOrders`
  ADD CONSTRAINT `carOrders_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`id`),
  ADD CONSTRAINT `carOrders_ibfk_2` FOREIGN KEY (`carId`) REFERENCES `cars` (`id`),
  ADD CONSTRAINT `carOrders_ibfk_3` FOREIGN KEY (`placeId`) REFERENCES `places` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
