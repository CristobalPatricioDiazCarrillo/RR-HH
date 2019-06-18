-- phpMyAdmin SQL Dump
-- version 4.8.5
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jun 18, 2019 at 04:39 AM
-- Server version: 10.1.38-MariaDB
-- PHP Version: 7.3.3

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `empresa`
--

-- --------------------------------------------------------

--
-- Table structure for table `areas`
--

CREATE TABLE `areas` (
  `id` int(3) NOT NULL,
  `nombre` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `areas`
--

INSERT INTO `areas` (`id`, `nombre`) VALUES
(1, 'Ventas'),
(2, 'RRHH');

-- --------------------------------------------------------

--
-- Table structure for table `capacitaciones`
--

CREATE TABLE `capacitaciones` (
  `id` int(3) NOT NULL,
  `nombre` varchar(100) NOT NULL,
  `descripcion` text NOT NULL,
  `area` varchar(50) NOT NULL,
  `fecha` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `capacitaciones`
--

INSERT INTO `capacitaciones` (`id`, `nombre`, `descripcion`, `area`, `fecha`) VALUES
(1, 'Liderazgo y Comunicación en la Administración de Riesgos', 'Al término del curso los alumnos serán capaces de Identificar estilos, estrategias, elementos básicos en los procesos de liderazgo y de comunicaciones, a través del conocimiento de las técnicas preventivas para ser aplicadas en el desarrollo y gestión de la seguridad y salud en el Trabajo.', 'RRHH', '2019-03-14'),
(2, 'Atención de Público', 'Al finalizar el curso, el participante estará en condiciones de comprender los aspectos que se deben considerar en la prevención de riesgos derivados de la atención de público, como las aptitudes personales que esta función demanda.', 'Ventas', '2019-01-15'),
(3, 'Actitudes Preventivas', 'Al término del curso los alumnos serán capaces de comprender y aplicar conductas positivas en su entorno laboral, valorando la importancia de su vida. Lo anterior con el propósito de evitar incidentes/accidentes.', 'Ventas', '2019-02-12');

-- --------------------------------------------------------

--
-- Table structure for table `descripciones`
--

CREATE TABLE `descripciones` (
  `id` int(3) NOT NULL,
  `id_t` int(3) NOT NULL,
  `asunto` varchar(50) NOT NULL,
  `descripcion` text NOT NULL,
  `fecha` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `descripciones`
--

INSERT INTO `descripciones` (`id`, `id_t`, `asunto`, `descripcion`, `fecha`) VALUES
(1, 9, 'Buen trabajador', 'Cumple con las expectativas, se comporta de buena manera y genera un ambiente optimo en sus compañeros', '2019-04-15'),
(2, 9, 'Cambio de area', 'Por buen desepeño se asciende al trabajador, asignadolo a otra seccion con una mejor puesto', '2019-04-26'),
(3, 9, 'Nuevo equipo de trabajo', 'Al trabajador se le asigna un grupo de trabajo, al que debe supervisar y ayudar.', '2019-06-10'),
(4, 9, 'Hola', 'cascasca', '2019-06-12'),
(5, 9, 'Hola', 'gfbfgbfgbfgbfgb', '2019-06-19');

-- --------------------------------------------------------

--
-- Table structure for table `informaciones`
--

CREATE TABLE `informaciones` (
  `id` int(3) NOT NULL,
  `nombre` varchar(40) NOT NULL,
  `texto` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `informaciones`
--

INSERT INTO `informaciones` (`id`, `nombre`, `texto`) VALUES
(1, 'noticia', 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?\r\n						But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system, and expound the actual teachings of the great explorer of the truth, the master-builder of human happiness. No one rejects, dislikes, or avoids pleasure itself, because it is pleasure, but because those who do not know how to pursue pleasure rationally encounter consequences that are extremely painful. Nor again is there anyone who loves or pursues or desires to obtain pain of itself, because it is pain, but because occasionally circumstances occur in which toil and pain can procure him some great pleasure. To take a trivial example, which of us ever undertakes laborious physical exercise, except to obtain some advantage from it? But who has any right to find fault with a man who chooses to enjoy a pleasure that has no annoying consequences, or one who avoids a pain that produces no resultant pleasure?'),
(2, 'mision', 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?'),
(3, 'vision', 'But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system, and expound the actual teachings of the great explorer of the truth, the master-builder of human happiness. No one rejects, dislikes, or avoids pleasure itself, because it is pleasure, but because those who do not know how to pursue pleasure rationally encounter consequences that are extremely painful. Nor again is there anyone who loves or pursues or desires to obtain pain of itself, because it is pain, but because occasionally circumstances occur in which toil and pain can procure him some great pleasure. To take a trivial example, which of us ever undertakes laborious physical exercise, except to obtain some advantage from it? But who has any right to find fault with a man who chooses to enjoy a pleasure that has no annoying consequences, or one who avoids a pain that produces no resultant pleasure?');

-- --------------------------------------------------------

--
-- Table structure for table `sessions`
--

CREATE TABLE `sessions` (
  `session_id` varchar(128) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `expires` int(11) UNSIGNED NOT NULL,
  `data` text CHARACTER SET utf8mb4 COLLATE utf8mb4_bin
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `sessions`
--

INSERT INTO `sessions` (`session_id`, `expires`, `data`) VALUES
('IzScregRtcfM6Pmr5EpdAoL0lvpRYs5-', 1560910235, '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"httpOnly\":true,\"path\":\"/\"},\"flash\":{},\"passport\":{}}'),
('Vdx4Y2QexrZaMsNmgG1MRav6w5_Eqni0', 1560838401, '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"httpOnly\":true,\"path\":\"/\"},\"flash\":{},\"passport\":{\"user\":3}}');

-- --------------------------------------------------------

--
-- Table structure for table `trabajadores`
--

CREATE TABLE `trabajadores` (
  `id` int(3) NOT NULL,
  `nombre` varchar(50) NOT NULL,
  `apellido` varchar(50) NOT NULL,
  `rut` varchar(10) NOT NULL,
  `fecha_nacimiento` varchar(10) NOT NULL,
  `area` varchar(50) NOT NULL,
  `correo` varchar(40) NOT NULL,
  `telefono` int(9) NOT NULL,
  `nacionalidad` varchar(30) NOT NULL,
  `estado_civil` varchar(10) NOT NULL,
  `genero` varchar(15) NOT NULL,
  `region` varchar(50) NOT NULL,
  `comuna` varchar(55) NOT NULL,
  `direccion` varchar(50) NOT NULL,
  `nivel_estudios` varchar(40) NOT NULL,
  `nivel_capacitacion` int(2) NOT NULL,
  `num_capacitacion` int(2) NOT NULL,
  `image` varchar(8) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `trabajadores`
--

INSERT INTO `trabajadores` (`id`, `nombre`, `apellido`, `rut`, `fecha_nacimiento`, `area`, `correo`, `telefono`, `nacionalidad`, `estado_civil`, `genero`, `region`, `comuna`, `direccion`, `nivel_estudios`, `nivel_capacitacion`, `num_capacitacion`, `image`) VALUES
(9, 'JOSE ANTONIO ', 'BURGOS SANMARTIN', '11222333-4', '1989-06-15', 'Ventas', 'random1@gmail.com', 548181287, 'Chile', 'Casado', 'Femenino', 'Region de Atacama', 'Rinconada', 'Paseo Errades arteries, 74', 'Superior Incompleta', 2, 3, '9'),
(10, 'VICTOR MANUEL', 'HENRIQUEZ LOSADA', '12341234-3', '1995-06-15', 'RRHH', 'random2@gmail.com', 166859762, 'Chile', 'Soltero', 'Masculino', 'I', 'Quilpué', 'Cañada Adelitar, 226 2ºF', 'Media', 6, 5, '10'),
(11, 'JUAN JOSEP', 'NAVARRO MORENO', '87654321-9', '1999-02-17', 'Ventas', 'random3@gmail.com', 472110081, 'Bolivia', 'Soltero', 'Masculino', 'II', 'Llay-Llay', 'Callejón Sospedrarien, 122A 4ºF', 'Superior', 4, 5, '11'),
(12, 'JOSE FRANCISCO', 'CASALS ARNAU', '12457886-8', '1993-06-12', 'Ventas', 'random4@gmail.com', 725888140, 'Chile', 'Casado', 'Masculino', 'IX', 'Limache', 'Callejón Legislo, 1 12ºF', 'Superior', 1, 1, '12'),
(17, 'JOSE FRANCISCO', 'OLIVERA MOSQUERA', '15975631-6', '1994-06-22', 'Ventas', 'random5@gmail.com', 561472744, 'Argentina', 'Casado', 'Masculino', 'IX', 'Quilpué', 'Carretera Juramentí, 168 13ºA', 'Basica', 6, 8, '17'),
(18, 'JOSE MARIA', 'GIRALDO MARI', '14242342-5', '1997-10-15', 'Ventas', 'random6@gmail.com', 106086020, 'Chile', 'Soltero', 'Masculino', 'IX', 'Limache', 'Paseo Cuitada, 163A 8ºG', 'Media', 4, 3, '18'),
(20, 'JOSE CARLOS', 'BAUTISTA ALBERDI', '19876453-8', '1992-03-13', 'RRHH', 'random7@gmail.com', 186489694, 'Chile', 'Casado', 'Masculino', 'I', 'Llay-Llay', 'Plaza Bescantador, 282 15ºA', 'Basica', 5, 6, '20'),
(21, 'JOSE FRANCISCO', 'BRIONES CERDAN', '17987654-0', '1978-07-14', 'RRHH', 'random8@gmail.com', 228344131, 'Colombia', 'Soltero', 'Masculino', 'II', 'Rinconada', 'Carrera C enaiguatejo, 6 2ºH', 'Superior', 5, 5, '21'),
(24, 'JUAN MANUEL', 'REGUEIRA FUSTER', '16789567-2', '2000-06-30', 'Ventas', 'random9@gmail.com', 111021822, 'Chile', 'Soltero', 'Masculino', 'IX', 'Quilpué', 'Pasadizo Portaescuradentsos, 54 18ºC', 'Media', 2, 2, '24'),
(26, 'ALEXANDER FERNANDO', 'FUENTES FIGUEROA', '19247222-2', '2001-01-31', 'RRHH', 'random10@gmail.com', 806961145, 'Peru', 'Casado', 'Masculino', 'IV', 'Quilpué', 'Carrer Llauró, 3A 15ºC', 'Superior', 3, 2, 'default'),
(27, 'JUAN MANUEL', 'ETXEBARRIA GARROTE', '13987456-0', '1975-10-23', 'RRHH', 'random11@gmail.com', 838343457, 'China', 'Casado', 'Masculino', 'IX', 'Llay-Llay', 'Plaza Acarnissessin, 148B 19ºC', 'Media', 2, 3, '27'),
(28, 'JOSE IGNACIO', 'OLIVAN MIGUEZ', '12567321-2', '1994-07-12', 'Ventas', 'random12@gmail.com', 534386307, 'Chile', 'Soltero', 'Masculino', 'X', 'Rinconada', 'Cañada Acerara, 234A', 'Superior', 6, 5, 'default'),
(29, 'JOSE MANUEL', 'PARRADO BALLESTA', '14789678-9', '1986-10-17', 'Ventas', 'random13@gmail.com', 444511503, 'Chile', 'Soltero', 'Masculino', 'XI', 'Limache', 'Alameda Remaren, 152A 7ºA', 'Media', 3, 4, 'default'),
(30, 'FRANCISCO JOSE', 'CHAMIZO SOUSA', '12678934-4', '1989-09-13', 'RRHH', 'random14@gmail.com', 92774497, 'Peru', 'Soltero', 'Masculino', 'X', 'Llay-Llay', 'Paseo Encastaven finquen, 277A', 'Basica', 2, 3, 'default'),
(31, 'JOSE FRANCISCO', 'CUENCA VALLES', '18345725-9', '1987-04-25', 'Ventas', 'random15@gmail.com', 80829519, 'Japon', 'Casado', 'Masculino', 'XII', 'Rinconada', 'Acceso Corbaran, 148A 13ºH', 'Media', 3, 1, 'default');

-- --------------------------------------------------------

--
-- Table structure for table `usuarios`
--

CREATE TABLE `usuarios` (
  `id` int(11) NOT NULL,
  `nombre` varchar(20) NOT NULL,
  `password` varchar(60) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `usuarios`
--

INSERT INTO `usuarios` (`id`, `nombre`, `password`) VALUES
(2, 'Perico', '$2a$10$eqvlPTbhDioilPl0Pc4dz.lIjdwrxH9vx4NPk1fLO7CpWFsu/P19m'),
(3, 'admin', '$2a$10$60HhE4jVDhbCJcflAuReUuiw0EQPxS0iB5wVkadkol2Od4llXXL3S'),
(4, 'cristobal', '$2a$10$Cb25EdJ/WQGJ/bG7nTcQdeRBYT/KBtstgDb9dx5HmWq7AqXXwj.D2');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `areas`
--
ALTER TABLE `areas`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `capacitaciones`
--
ALTER TABLE `capacitaciones`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `descripciones`
--
ALTER TABLE `descripciones`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `sessions`
--
ALTER TABLE `sessions`
  ADD PRIMARY KEY (`session_id`);

--
-- Indexes for table `trabajadores`
--
ALTER TABLE `trabajadores`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `areas`
--
ALTER TABLE `areas`
  MODIFY `id` int(3) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `capacitaciones`
--
ALTER TABLE `capacitaciones`
  MODIFY `id` int(3) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `descripciones`
--
ALTER TABLE `descripciones`
  MODIFY `id` int(3) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `trabajadores`
--
ALTER TABLE `trabajadores`
  MODIFY `id` int(3) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=36;

--
-- AUTO_INCREMENT for table `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
