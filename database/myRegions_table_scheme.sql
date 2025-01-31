CREATE TABLE `myRegions` (
  `idRegion` int NOT NULL AUTO_INCREMENT,
  `Name` varchar(55) DEFAULT NULL,
  `Country` varchar(55) NOT NULL,
  `FirstHad` date DEFAULT NULL,
  `RealRegion` json DEFAULT NULL,
  `RealRegionID` int DEFAULT NULL,
  `ISO3166_2` json DEFAULT NULL,
  PRIMARY KEY (`idRegion`),
  KEY `RealRegionID` (`RealRegionID`),
  KEY `Name` (`Name`),
  CONSTRAINT `myregions_ibfk_1` FOREIGN KEY (`RealRegionID`) REFERENCES `EuropeanRegions` (`idEuropeanRegion`)
) ENGINE=InnoDB AUTO_INCREMENT=705 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;