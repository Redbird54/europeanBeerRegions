CREATE TABLE `Territories` (
  `idTerritory` int NOT NULL AUTO_INCREMENT,
  `Name` varchar(55) NOT NULL,
  `Type` varchar(55) DEFAULT NULL,
  `OwnedBy` int NOT NULL,
  `RegionName` varchar(55) DEFAULT NULL,
  `RegionCount` int NOT NULL DEFAULT ''0'',
  PRIMARY KEY (`idTerritory`),
  UNIQUE KEY `Name` (`Name`),
  KEY `OwnedBy` (`OwnedBy`),
  CONSTRAINT `territories_ibfk_1` FOREIGN KEY (`OwnedBy`) REFERENCES `Countries` (`idCountry`)
) ENGINE=InnoDB AUTO_INCREMENT=54 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;