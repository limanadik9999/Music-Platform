-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: mysql
-- Generation Time: Jun 14, 2021 at 02:26 PM
-- Server version: 5.7.34
-- PHP Version: 7.4.20

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `playlists_db`
--

-- --------------------------------------------------------

--
-- Table structure for table `album`
--

CREATE TABLE `album` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `userId` int(11) NOT NULL,
  `year` varchar(100) NOT NULL,
  `genre` varchar(100) NOT NULL,
  `playlistId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `album`
--

INSERT INTO `album` (`id`, `name`, `userId`, `year`, `genre`, `playlistId`) VALUES
(1, 'Album1_1', 1, '2020', 'Pop', 1),
(2, 'Album1_2', 1, '2021', 'Rock', 1),
(3, 'Album2_1', 2, '2021', 'Rock', 2);

-- --------------------------------------------------------

--
-- Table structure for table `playlist`
--

CREATE TABLE `playlist` (
  `id` int(11) NOT NULL,
  `name` varchar(50) NOT NULL,
  `userId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `playlist`
--

INSERT INTO `playlist` (`id`, `name`, `userId`) VALUES
(1, 'Playlist_1', 1),
(2, 'Playlist_2', 2);

-- --------------------------------------------------------

--
-- Table structure for table `review`
--

CREATE TABLE `review` (
  `id` int(11) NOT NULL,
  `rating` int(11) NOT NULL,
  `comment` varchar(320) NOT NULL,
  `albumId` int(11) NOT NULL,
  `userId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `review`
--

INSERT INTO `review` (`id`, `rating`, `comment`, `albumId`, `userId`) VALUES
(2, 3, 'Not bad', 1, 1),
(3, 4, 'Good', 2, 2),
(4, 1, 'Very bad', 2, 3),
(5, 5, 'Excellent', 2, 1),
(6, 5, 'The best I have ever heard', 3, 1),
(7, 3, 'Average music', 3, 2),
(8, 2, 'The voice is weak', 3, 3),
(9, 5, 'Cool', 3, 4),
(10, 4, 'Like it', 3, 5),
(1, 5, 'Perfect', 1, 2);

-- --------------------------------------------------------

--
-- Table structure for table `role`
--

CREATE TABLE `role` (
  `id` int(11) NOT NULL,
  `name` varchar(15) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `role`
--

INSERT INTO `role` (`id`, `name`) VALUES
(1, 'artist'),
(2, 'listener');

-- --------------------------------------------------------

--
-- Table structure for table `song`
--

CREATE TABLE `song` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `duration` varchar(100) NOT NULL,
  `albumId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `id` int(11) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(15) NOT NULL,
  `roleId` int(5) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`id`, `email`, `password`, `roleId`) VALUES
(1, 'test1@test.com', 'qwerty123', 1),
(2, 'test2@test.com', 'qwerty123', 1),
(3, 'test3@test.com', 'qwerty123', 2),
(4, 'test4@test.com', 'qwerty123', 2),
(5, 'test5@test.com', 'qwerty123', 2);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `album`
--
ALTER TABLE `album`
  ADD PRIMARY KEY (`id`),
  ADD KEY `userId` (`userId`),
  ADD KEY `playlistId` (`playlistId`);

--
-- Indexes for table `playlist`
--
ALTER TABLE `playlist`
  ADD PRIMARY KEY (`id`),
  ADD KEY `userId` (`userId`);

--
-- Indexes for table `review`
--
ALTER TABLE `review`
  ADD KEY `albumId` (`albumId`),
  ADD KEY `userId` (`userId`);

--
-- Indexes for table `role`
--
ALTER TABLE `role`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `song`
--
ALTER TABLE `song`
  ADD KEY `albumId` (`albumId`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`),
  ADD KEY `roleId` (`roleId`);

--
-- Constraints for dumped tables
--

--
-- Constraints for table `album`
--
ALTER TABLE `album`
  ADD CONSTRAINT `album_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `user` (`id`),
  ADD CONSTRAINT `album_ibfk_2` FOREIGN KEY (`playlistId`) REFERENCES `playlist` (`id`);

--
-- Constraints for table `playlist`
--
ALTER TABLE `playlist`
  ADD CONSTRAINT `playlist_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `user` (`id`);

--
-- Constraints for table `review`
--
ALTER TABLE `review`
  ADD CONSTRAINT `review_ibfk_1` FOREIGN KEY (`albumId`) REFERENCES `album` (`id`),
  ADD CONSTRAINT `review_ibfk_2` FOREIGN KEY (`userId`) REFERENCES `user` (`id`);

--
-- Constraints for table `song`
--
ALTER TABLE `song`
  ADD CONSTRAINT `song_ibfk_1` FOREIGN KEY (`albumId`) REFERENCES `album` (`id`);

--
-- Constraints for table `user`
--
ALTER TABLE `user`
  ADD CONSTRAINT `user_ibfk_1` FOREIGN KEY (`roleId`) REFERENCES `role` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
