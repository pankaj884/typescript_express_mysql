
CREATE TABLE `Users` (
  `id` int(11) NOT NULL,
  `name` char(50) NOT NULL,
  `email` varchar(100) NOT NULL,
  `country` char(20) NOT NULL,
  `city` char(40) NOT NULL,
  `tempRangeStart` float NOT NULL,
  `tempRangeEnd` float NOT NULL,
  `lastNotification` smallint(6) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP
)

-- Indexes for table `Users`
--
ALTER TABLE `Users`
  ADD PRIMARY KEY (`id`),
  ADD KEY `lastNotification` (`lastNotification`),
  ADD KEY `tempRangeStart` (`tempRangeStart`),
  ADD KEY `tempRangeEnd` (`tempRangeEnd`),
  ADD KEY `notification_startRange` (`tempRangeStart`,`lastNotification`),
  ADD KEY `notification_endRange` (`tempRangeEnd`,`lastNotification`);

  
--
-- AUTO_INCREMENT for table `Users`
--
ALTER TABLE `Users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

INSERT INTO `Users` (`id`, `name`, `email`, `country`, `city`, `tempRangeStart`, `tempRangeEnd`, `lastNotification`, `createdAt`, `updatedAt`) VALUES
(1, 'pankaj', 'pankaj884@gmail.com', 'India', 'delhi', 10, 25, 0, '2019-05-25 11:37:30', '2019-05-25 14:18:42'),
(2, 'karan', 'karan@gmail.com', 'India', 'mumbai', 5, 10, 1, '2019-05-25 11:45:39', '2019-05-25 14:18:42'),
(3, 'siddharth', 's1@gmail.com', 'India', 'mumbai', 0, 40, 0, '2019-05-25 11:55:32', '2019-05-25 14:18:42');
