CREATE TABLE `Unrecognized` (
  `idUnCountry` int NOT NULL AUTO_INCREMENT,
  `Name` varchar(55) NOT NULL,
  `ClaimedBy` int NOT NULL,
  `RegionName` varchar(55) DEFAULT NULL,
  `RegionCount` int NOT NULL DEFAULT '0',
  PRIMARY KEY (`idUnCountry`),
  KEY `ClaimedBy` (`ClaimedBy`),
  CONSTRAINT `unrecognized_ibfk_1` FOREIGN KEY (`ClaimedBy`) REFERENCES `Countries` (`idCountry`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;