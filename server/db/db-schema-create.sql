
CREATE TABLE `Users` (
  `name` char(50) NOT NULL,
  `email` varchar(100) NOT NULL,
  `city` char(40) NOT NULL,
  `tempRangeStart` float NOT NULL,
  `tempRangeEnd` float NOT NULL,
  `lastNotification` smallint(6) NOT NULL
)

INSERT INTO `Users` (`name`, `email`, `city`, `tempRangeStart`, `tempRangeEnd`, `lastNotification`) VALUES
('pankaj', 'pankaj884@gmail.com', 'delhi', 10, 25, 0);