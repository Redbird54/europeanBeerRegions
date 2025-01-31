CREATE TABLE `EuropeanRegions` (
  `idEuropeanRegion` int NOT NULL AUTO_INCREMENT,
  `Name` varchar(55) NOT NULL,
  `Type` varchar(55) DEFAULT NULL,
  `Country` varchar(55) NOT NULL,
  `OtherRegion` json DEFAULT NULL,
  `idCountry` int DEFAULT NULL,
  `idTerritory` int DEFAULT NULL,
  PRIMARY KEY (`idEuropeanRegion`),
  KEY `idCountry_idx` (`idCountry`),
  KEY `idTerritory_idx` (`idTerritory`),
  KEY `Name` (`Name`),
  CONSTRAINT `idCountry` FOREIGN KEY (`idCountry`) REFERENCES `Countries` (`idCountry`),
  CONSTRAINT `idTerritory` FOREIGN KEY (`idTerritory`) REFERENCES `Territories` (`idTerritory`)
) ENGINE=InnoDB AUTO_INCREMENT=514 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;