-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Servidor: localhost
-- Tiempo de generación: 03-09-2022 a las 23:17:33
-- Versión del servidor: 10.4.24-MariaDB
-- Versión de PHP: 8.1.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `michibot`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `houses`
--

CREATE TABLE `houses` (
  `id` int(255) NOT NULL,
  `owner_name` varchar(255) DEFAULT NULL,
  `owner_id` varchar(255) DEFAULT NULL,
  `owner_money` int(255) NOT NULL DEFAULT 0,
  `owner_inv_food` int(255) NOT NULL DEFAULT 0,
  `owner_inv_medicine` int(255) NOT NULL DEFAULT 0,
  `cat_name` varchar(255) DEFAULT NULL,
  `cat_age` int(255) NOT NULL DEFAULT 0,
  `cat_state_love` int(255) NOT NULL DEFAULT 100,
  `cat_state_fun` int(255) NOT NULL DEFAULT 100,
  `cat_state_hunger` int(255) NOT NULL DEFAULT 100,
  `cat_state_life` int(255) NOT NULL DEFAULT 100,
  `cat_emoji` varchar(255) DEFAULT NULL,
  `cat_level_xp` int(255) NOT NULL DEFAULT 0,
  `cat_level_xpLimit` int(255) NOT NULL DEFAULT 1,
  `cat_level_now` int(255) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='En esta tabla se guardarán las casas. Miau.';

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `houses`
--
ALTER TABLE `houses`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `houses`
--
ALTER TABLE `houses`
  MODIFY `id` int(255) NOT NULL AUTO_INCREMENT;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
