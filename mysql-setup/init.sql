CREATE DATABASE IF NOT EXISTS monitoring_system;
USE monitoring_system;

CREATE TABLE IF NOT EXISTS `notification` (
  `id` int  NOT NULL ,
  `process_db_id` int NOT NULL,
  `error_message` text NOT NULL,
  `running_time_sec` int NOT NULL,
  `status` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

ALTER TABLE `notification`
  ADD PRIMARY KEY (`id`);



CREATE TABLE IF NOT EXISTS `process` (
  `id` int   NOT NULL,
  `pid` int NOT NULL,
  `host_machine_id` int NOT NULL,
  `log_file` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `notification_params` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


ALTER TABLE `process`
  ADD PRIMARY KEY (`id`);









