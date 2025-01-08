CREATE TABLE `Countries` (
  `idCountry` int NOT NULL AUTO_INCREMENT,
  `Name` varchar(55) NOT NULL,
  `RegionName` varchar(55) DEFAULT NULL,
  `RegionCount` int NOT NULL DEFAULT ''0'',
  PRIMARY KEY (`idCountry`),
  UNIQUE KEY `Name` (`Name`)
) ENGINE=InnoDB AUTO_INCREMENT=197 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;