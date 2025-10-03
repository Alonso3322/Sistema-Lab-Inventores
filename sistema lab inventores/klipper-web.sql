-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 04-10-2025 a las 01:19:15
-- Versión del servidor: 10.4.28-MariaDB
-- Versión de PHP: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `klipper-web`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `user`
--

CREATE TABLE `user` (
  `id` int(11) NOT NULL,
  `email` varchar(191) DEFAULT NULL,
  `password` varchar(191) NOT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `updatedAt` datetime(3) NOT NULL,
  `carrera` varchar(191) NOT NULL,
  `codigo_estudiante` varchar(191) NOT NULL,
  `nombre` varchar(191) NOT NULL,
  `rol` varchar(191) NOT NULL,
  `telefono` varchar(191) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `user`
--

INSERT INTO `user` (`id`, `email`, `password`, `createdAt`, `updatedAt`, `carrera`, `codigo_estudiante`, `nombre`, `rol`, `telefono`) VALUES
(1, 'alonso@gmail.com', '$2b$10$Ifk8W2nMKBLGu60tFeRLaOJXzn1VM7PMIXoGQuqynN.cuURVCk2jW', '2025-10-02 22:28:06.859', '2025-10-02 22:28:06.859', 'Ingeniería en Computación', '216242632', 'Alonso Venegas ', 'user', '387896590'),
(2, 'andrea@gmail.com', '$2b$10$Piu8b0RpOtwPYb4IhPgAnu2VPGCLZcpam/ijICgwPl95n9xTBaCiC', '2025-10-02 22:34:54.865', '2025-10-02 22:34:54.865', 'Ingeniería en Computación', '123456789', 'Andrea Jimenez', 'ADMIN', '68275476573'),
(7, 'vvenegas@gmail.com', '$2b$10$Sm4fx9gyKS4tS0aU3PXXWeoCeZIMrdTBgtkSkogKQXce3YIxYdoA6', '2025-10-03 01:28:44.397', '2025-10-03 01:28:44.397', 'Ingeniería Informática', '11100088', 'Victor Venegas', 'USER', '787483583'),
(8, 'katia@gmail.com', '$2b$10$y.9zuuaVIUdKjcN6FVS3MOX9ygFhYcxbYSlb6ps4D.T5fae2t7sJS', '2025-10-03 01:34:51.066', '2025-10-03 01:34:51.066', 'Ingeniería en Computación', '222555', 'Katia Hernandez ', 'USER', '2743589835'),
(9, 'checo@gamil.com', '$2b$10$z7u//iRDjKKhGtncoxL9iOvCYEIu1Ds7pvrS7QTsNyZ/nkDAgt6Za', '2025-10-03 01:52:41.634', '2025-10-03 01:52:41.634', 'Ingeniería en Computación', '999555888', 'Checo Perez', 'USER', '2284893389'),
(10, 'lucashdz@hotmail.com', '$2b$10$pV0CXOrdHe1.kV31SGzgK.UVYai/8ILpnU8T4nptNA2cs3Hl4khXq', '2025-10-03 01:55:51.466', '2025-10-03 01:55:51.466', 'Ingeniería Electrónica', '12345', 'lucas hernandez', 'USER', '211423465'),
(11, 'anniekarich@gmail.com', '$2b$10$VCOS5rUmGt4mBYm9xInKbeH5tKwKFYQFPlc.NOQf3N1FZz6XXREt.', '2025-10-03 02:03:06.568', '2025-10-03 02:03:06.568', 'Ingeniería en Computación', '222555666', 'AnnieKarich', 'ADMIN', '8976428'),
(12, 'chino@gmail.com', '$2b$10$2HIF/P8KMW37REMndiKoQ.y.q4P6Ha6lFaaiWzbnPJlEDdYZilBOS', '2025-10-03 02:12:03.433', '2025-10-03 02:12:03.433', 'Ingeniería Informática', '111777222', 'Chino Venegas', 'ADMIN', '29483978');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `_prisma_migrations`
--

CREATE TABLE `_prisma_migrations` (
  `id` varchar(36) NOT NULL,
  `checksum` varchar(64) NOT NULL,
  `finished_at` datetime(3) DEFAULT NULL,
  `migration_name` varchar(255) NOT NULL,
  `logs` text DEFAULT NULL,
  `rolled_back_at` datetime(3) DEFAULT NULL,
  `started_at` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `applied_steps_count` int(10) UNSIGNED NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `User_codigo_estudiante_key` (`codigo_estudiante`),
  ADD UNIQUE KEY `User_email_key` (`email`);

--
-- Indices de la tabla `_prisma_migrations`
--
ALTER TABLE `_prisma_migrations`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `user`
--
ALTER TABLE `user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
