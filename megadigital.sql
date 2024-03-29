-- MySQL dump 10.13  Distrib 8.0.36, for Win64 (x86_64)
--
-- Host: localhost    Database: megadigital
-- ------------------------------------------------------
-- Server version	8.0.36

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `habitacion`
--

DROP TABLE IF EXISTS `habitacion`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `habitacion` (
  `id` int NOT NULL AUTO_INCREMENT,
  `habitacionpiso` int DEFAULT NULL,
  `habitacionnro` int DEFAULT NULL,
  `cantcamas` int DEFAULT NULL,
  `tienetelevision` tinyint(1) DEFAULT NULL,
  `tienefrigobar` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`id`),
  CONSTRAINT `habitacion_chk_1` CHECK (((`habitacionpiso` > 0) and (`habitacionpiso` <= 10))),
  CONSTRAINT `habitacion_chk_2` CHECK (((`habitacionnro` > 0) and (`habitacionnro` <= 20))),
  CONSTRAINT `habitacion_chk_3` CHECK (((`cantcamas` >= 1) and (`cantcamas` <= 4)))
) ENGINE=InnoDB AUTO_INCREMENT=97 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `habitacion`
--

LOCK TABLES `habitacion` WRITE;
/*!40000 ALTER TABLE `habitacion` DISABLE KEYS */;
INSERT INTO `habitacion` VALUES (91,2,2,2,0,0),(92,2,2,1,1,1),(93,1,3,4,1,1),(94,2,1,1,1,1),(95,1,4,4,1,1),(96,2,3,1,1,1);
/*!40000 ALTER TABLE `habitacion` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `persona`
--

DROP TABLE IF EXISTS `persona`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `persona` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nombrecompleto` varchar(255) NOT NULL,
  `nrodocumento` int NOT NULL,
  `correo` varchar(255) NOT NULL,
  `telefono` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `nrodocumento` (`nrodocumento`),
  UNIQUE KEY `correo` (`correo`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `persona`
--

LOCK TABLES `persona` WRITE;
/*!40000 ALTER TABLE `persona` DISABLE KEYS */;
INSERT INTO `persona` VALUES (1,'Luis Delorenzi',5197178,'ldelorenzi@fiuna.edu.py','0981541327'),(2,'Jime',5197179,'jime@gmail.com','0981611611'),(3,'alan',5197177,'alan@gmail.com','0981666666'),(5,'nestor',5197176,'nestor@gmail.com','0981666667'),(6,'Mario',5664477,'mario@gmail.com','0981235689');
/*!40000 ALTER TABLE `persona` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `reserva`
--

DROP TABLE IF EXISTS `reserva`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `reserva` (
  `id` int NOT NULL AUTO_INCREMENT,
  `fechareserva` datetime NOT NULL,
  `fechaentrada` date NOT NULL,
  `fechasalida` date NOT NULL,
  `habitacionid` int DEFAULT NULL,
  `personaid` int DEFAULT NULL,
  `montoreserva` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_reserva_habitacion` (`habitacionid`),
  KEY `fk_reserva_persona` (`personaid`),
  CONSTRAINT `fk_reserva_habitacion` FOREIGN KEY (`habitacionid`) REFERENCES `habitacion` (`id`),
  CONSTRAINT `fk_reserva_persona` FOREIGN KEY (`personaid`) REFERENCES `persona` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `reserva`
--

LOCK TABLES `reserva` WRITE;
/*!40000 ALTER TABLE `reserva` DISABLE KEYS */;
INSERT INTO `reserva` VALUES (12,'2024-02-21 23:21:40','2024-02-25','2024-03-01',91,1,600000),(16,'2024-02-21 03:00:00','2024-02-24','2024-02-26',95,1,240000),(17,'2024-02-21 03:00:00','2024-02-23','2024-02-28',96,1,600000);
/*!40000 ALTER TABLE `reserva` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-02-22 21:17:26
