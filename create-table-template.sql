SHOW TABLES;
DROP TABLE IF EXISTS Seat, Booking, Customer, Flight;
CREATE TABLE Flight ( 
    flightId INT AUTO_INCREMENT PRIMARY KEY, 
    flightNumber VARCHAR(20) NOT NULL, 
    departureTime DATETIME NOT NULL, 
    arrivalTime DATETIME NOT NULL, 
    totalSeats INT NOT NULL 
);
SHOW TABLES;
CREATE TABLE Customer ( 
    customerId INT AUTO_INCREMENT PRIMARY KEY, 
    name VARCHAR(100) NOT NULL, 
    email VARCHAR(100) NOT NULL, 
    phone VARCHAR(20) 
);
CREATE TABLE Booking ( 
    bookingId INT AUTO_INCREMENT PRIMARY KEY, 
    customerId INT NOT NULL, 
    flightId INT NOT NULL, 
    bookingDate DATE, 
    FOREIGN KEY (customerId) REFERENCES Customer(customerId) ON DELETE CASCADE, 
    FOREIGN KEY (flightId) REFERENCES Flight(flightId) ON DELETE CASCADE
);

  
CREATE TABLE Seat ( 
    seatId INT AUTO_INCREMENT PRIMARY KEY, 
    flightId INT NOT NULL, 
    seatNumber VARCHAR(10), 
    isAvailable BOOLEAN DEFAULT TRUE, 
    bookingId INT NULL, 
    FOREIGN KEY (flightId) REFERENCES Flight(flightId) ON DELETE CASCADE, 
    FOREIGN KEY (bookingId) REFERENCES Booking(bookingId) ON DELETE SET NULL
);
INSERT INTO Flight (flightNumber, departureTime, arrivalTime, totalSeats) 
VALUES 
('AI202', '2025-02-25 10:00:00', '2025-02-25 12:00:00', 150),
('BA305', '2025-03-10 08:30:00', '2025-03-10 11:45:00', 180);
INSERT INTO Customer (name, email, phone) 
VALUES 
('John Doe', 'john@example.com', '1234567890'),
('Alice Smith', 'alice@example.com', '9876543210');
INSERT INTO Booking (customerId, flightId, bookingDate) 
VALUES 
(1, 1, '2025-02-20'),
(2, 2, '2025-03-05');
INSERT INTO Seat (flightId, seatNumber, isAvailable, bookingId) 
VALUES 
(1, '1A', FALSE, 1),
(1, '1B', TRUE, NULL),
(2, '2A', FALSE, 2),
(2, '2B', TRUE, NULL);
SELECT * FROM Flight;
SELECT * FROM Customer;
SELECT * FROM Booking;
SELECT * FROM Seat;
SELECT * FROM Seat;
INSERT INTO Seat (flightId, seatNumber, isAvailable) 
VALUES 
(1, '1A', TRUE), 
(1, '1B', TRUE), 
(1, '1C', FALSE), -- Booked seat
(2, '2A', TRUE), 
(2, '2B', FALSE); -- Booked seat
SELECT * FROM Seat WHERE flightId = 1;
SELECT * FROM Booking;
SELECT * FROM Seat WHERE isAvailable = FALSE;

CREATE TABLE Users (
    userId INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL
);
SELECT * FROM Users;
ALTER TABLE Seat MODIFY COLUMN bookingId INT NULL;
SELECT * FROM Booking;
SELECT * FROM Booking WHERE customerId = (SELECT userId FROM Users WHERE email = 'dummy@gmail.com');
SELECT * FROM Booking WHERE customerId = (SELECT userId FROM Users WHERE email = 'dummy@gmail.com');
SELECT * FROM Flight;
SELECT * FROM Flight WHERE DATE(departureTime) = '2025-02-25';
SELECT * FROM Booking;
SELECT * FROM Booking;
SELECT * FROM Seat WHERE isAvailable = FALSE;
SELECT * FROM Booking;
SELECT flightId, flightNumber, departureTime FROM Flight WHERE departureTime LIKE '2025-02-25%';
SELECT * FROM Flight WHERE DATE(departureTime) = '2025-02-25' AND fromLocation = 'BOM' AND toLocation = 'BLR';
SHOW COLUMNS FROM Flight;
ALTER TABLE Flight ADD COLUMN fromLocation VARCHAR(50) NOT NULL;
ALTER TABLE Flight ADD COLUMN toLocation VARCHAR(50) NOT NULL;
UPDATE Flight SET fromLocation = 'BOM', toLocation = 'BLR' WHERE flightId = 1;
Select * from Flight;
SELECT flightId, flightNumber, departureTime, fromLocation, toLocation FROM Flight;
SELECT * FROM Flight;
SELECT * FROM Flight 
WHERE DATE(departureTime) = '2025-02-25' 
AND fromLocation = 'BOM' 
AND toLocation = 'BLR';
SELECT * FROM Booking WHERE customerId = 1;
SELECT * FROM Seat WHERE bookingId IS NULL;
SELECT * FROM Booking WHERE bookingId = 1;
SELECT * FROM Booking;
SELECT * FROM Booking WHERE bookingId = 2;  -- Should return empty (deleted)
SELECT * FROM Seat WHERE bookingId = 2;     -- Should show bookingId as NULL, isAvailable = TRUE
INSERT INTO Flight (flightNumber, departureTime, arrivalTime, totalSeats, fromLocation, toLocation)
VALUES 
('AI203', '2025-02-26 06:00:00', '2025-02-26 08:00:00', 180, 'DEL', 'BOM'),
('AI204', '2025-02-27 09:30:00', '2025-02-27 12:00:00', 200, 'BLR', 'HYD'),
('AI205', '2025-02-28 14:00:00', '2025-02-28 16:30:00', 150, 'MAA', 'DEL');
INSERT INTO seats (flightId, seatNumber, isAvailable)
VALUES 
(2, '1A', TRUE), (2, '1B', TRUE), (2, '1C', TRUE), 
(3, '2A', TRUE), (3, '2B', TRUE), (3, '2C', TRUE),
(4, '3A', TRUE), (4, '3B', TRUE), (4, '3C', TRUE);
SELECT * FROM Seat WHERE flightId = 5;
SELECT seatId, flightId, seatNumber FROM Seat;
INSERT INTO Seat (flightId, seatNumber, isAvailable) VALUES 
(5, '1A', TRUE),
(5, '1B', TRUE),
(5, '1C', TRUE),
(5, '2A', TRUE),
(5, '2B', TRUE);
SELECT * FROM Booking WHERE customerId = ;  -- Replace 1 with your user ID
SELECT 
    B.bookingId, B.customerId, C.name AS customerName, 
    B.flightId, F.flightNumber, 
    S.seatId, S.seatNumber, S.isAvailable 
FROM Booking B
JOIN Customer C ON B.customerId = C.customerId
JOIN Flight F ON B.flightId = F.flightId
LEFT JOIN Seat S ON B.bookingId = S.bookingId
WHERE B.flightId = 5;  -- Replace 1 with your flightId
DESCRIBE Flight;

SELECT flightId FROM Flight;
SELECT seatNumber, COUNT(*) 
FROM seats 
WHERE flightId = 1 
GROUP BY seatNumber 
HAVING COUNT(*) > 1;
SHOW TABLES;
SHOW TABLES LIKE 'seat';
SHOW TABLES LIKE 'seats';
ALTER TABLE seats RENAME TO seat;
USE flight_booking;
SELECT * FROM seats WHERE flightId = 1;
SELECT * FROM Seat WHERE flightId = 5;
SHOW DATABASES;
SELECT * FROM seats;
SELECT * FROM seats WHERE flightId = 1;

SELECT seatId, seatNumber, isAvailable FROM seats WHERE flightId = 1;
SELECT DISTINCT seatNumber, isAvailable FROM seats WHERE flightId = 1;
SELECT * FROM seats WHERE flightId = 1;
SELECT * FROM Flight WHERE fromLocation = 'BOM' AND toLocation = 'BLR' AND DATE(departureTime) = '2025-02-25';
SELECT * FROM Flight WHERE fromLocation = 'BOM' AND toLocation = 'BLR' AND DATE(departureTime) = '2025-02-25';
select * from Flight;
SELECT * FROM Flight WHERE fromLocation = 'BOM' AND toLocation = 'BLR' AND DATE(departureTime) = '2025-03-25';
INSERT INTO Flight (fromLocation, toLocation, departureTime) VALUES ('BOM', 'BLR', '2025-03-25 10:00:00');
INSERT INTO Flight (flightNumber, fromLocation, toLocation, departureTime) 
VALUES ('AI101', 'BOM', 'BLR', '2025-03-25 10:00:00');
UPDATE Flight 
SET fromLocation = 'LHR', toLocation = 'JFK'  -- Replace with actual values
WHERE flightNumber = 'BA305';
ALTER TABLE Flight 
MODIFY COLUMN fromLocation VARCHAR(50) NOT NULL,
MODIFY COLUMN toLocation VARCHAR(50) NOT NULL;
SELECT * FROM seats WHERE flightId = 1;
show databases;
DESCRIBE seats;
desc seats;
SELECT * FROM Booking WHERE customerId = 1;
SELECT * FROM seats WHERE flightId = '1';
show databases;
DESC booking;
SELECT * FROM booking;
SHOW TABLES;
SELECT DATABASE();
USE flight_booking;

SELECT * FROM customer WHERE customerId = 4;
INSERT INTO customer (customerId, name, email) VALUES (4, 'Test User', 'test@example.com');
ALTER TABLE booking ADD COLUMN selectedSeats TEXT;
select * from seats;
SELECT seatId, COUNT(*) FROM Booking GROUP BY seatId HAVING COUNT(*) > 1;
use flight_booking;
SHOW COLUMNS FROM Booking;
SELECT selectedSeats, COUNT(*) FROM Booking GROUP BY selectedSeats HAVING COUNT(*) > 1;
SELECT selectedSeats, COUNT(*) 
FROM Booking 
WHERE selectedSeats IS NOT NULL 
GROUP BY selectedSeats 
HAVING COUNT(*) > 1;
UPDATE Booking 
SET selectedSeats = 'A1' 
WHERE bookingId = 29;

SHOW CREATE TABLE Booking;
ALTER TABLE Booking MODIFY selectedSeats TEXT;
INSERT INTO Booking (customerId, flightId, bookingDate, selectedSeats)
VALUES (4, 5, '2025-03-06', '[23, 20, 21]');
ALTER TABLE Booking ADD CONSTRAINT unique_booking UNIQUE (customerId, flightId, selectedSeats);
ALTER TABLE Booking 
MODIFY selectedSeats VARCHAR(255);
ALTER TABLE Booking 
ADD CONSTRAINT unique_booking UNIQUE (customerId, flightId, selectedSeats);
ALTER TABLE Booking 
MODIFY COLUMN selectedSeats VARCHAR(255);

insert into flight values(1, 'Al201', '2025-03-06 10:00:00', '2025-03-07 12:00:00', 150, 'BOM', 'BLR');
insert into flight values(6, 'Al202', '2025-03-07 10:00:00', '2025-03-08 12:00:00', 10, 'BOM', 'BLR');
UPDATE flight
SET departureTime = '2025-02-25 12:00:00', arrivalTime = '2025-02-26 1:00:00'
WHERE flightId = 1;

INSERT INTO flight (
  flightNumber,
  departureTime,
  arrivalTime,
  totalSeats,
  fromLocation,
  toLocation,
  price,
  airline
) VALUES
('AI202', '2025-03-20 08:30:00', '2025-03-20 11:00:00', 180, 'Delhi', 'Mumbai', 4500.00, 'Air India'),
('6E303', '2025-03-21 14:00:00', '2025-03-21 16:30:00', 200, 'Bangalore', 'Hyderabad', 3200.00, 'IndiGo'),
('SG404', '2025-03-22 18:00:00', '2025-03-22 20:45:00', 150, 'Chennai', 'Kolkata', 5000.00, 'SpiceJet'),
('UK505', '2025-03-23 06:15:00', '2025-03-23 09:00:00', 170, 'Mumbai', 'Delhi', 4800.00, 'Vistara'),
('IX606', '2025-03-24 22:00:00', '2025-03-25 01:00:00', 160, 'Hyderabad', 'Chennai', 3000.00, 'Air India Express');
INSERT INTO flight (
  flightNumber, departureTime, arrivalTime, totalSeats,
  fromLocation, toLocation, price, airline
) VALUES
('AI101', '2025-03-15 08:00:00', '2025-03-15 10:00:00', 180, 'BLR', 'DEL', 5000, 'Air India'),
('6E202', '2025-03-16 09:30:00', '2025-03-16 11:45:00', 160, 'DEL', 'HYD', 4500, 'IndiGo'),
('SG303', '2025-03-17 06:15:00', '2025-03-17 08:30:00', 150, 'BOM', 'MAA', 4800, 'SpiceJet'),
('UK404', '2025-03-18 11:00:00', '2025-03-18 13:10:00', 200, 'HYD', 'BLR', 3200, 'Vistara'),
('AI505', '2025-03-19 15:20:00', '2025-03-19 17:40:00', 175, 'CCU', 'GOI', 6200, 'Air India'),
('6E606', '2025-03-20 17:00:00', '2025-03-20 19:00:00', 180, 'PNQ', 'AMD', 4000, 'IndiGo'),
('SG707', '2025-03-21 14:30:00', '2025-03-21 16:45:00', 140, 'COK', 'BLR', 3700, 'SpiceJet'),
('UK808', '2025-03-22 08:45:00', '2025-03-22 10:55:00', 160, 'AMD', 'DEL', 4600, 'Vistara'),
('AI909', '2025-03-23 12:10:00', '2025-03-23 14:25:00', 190, 'GOI', 'BOM', 3900, 'Air India'),
('6E010', '2025-03-24 10:00:00', '2025-03-24 12:15:00', 170, 'MAA', 'CCU', 5300, 'IndiGo');

insert into seats values(1, 1, '1A', TRUE, NULL);
insert into seats values(2, 1, '1B', TRUE, NULL),(5, 1, '1C', TRUE, NULL),(6, 1, '1D', False, NULL);
insert into seats values(7, 6, '1A', TRUE, NULL),(24, 6, '1B', TRUE, NULL),(25, 6, '1C', TRUE, NULL),(26, 6, '1D', False, NULL);
insert into seats values(3, 2, '1A', TRUE, NULL),(4, 2, '1B', TRUE, NULL),(8, 2, '1C', TRUE, NULL),(9,2, '1D', TRUE, NULL);
insert into seats values(10, 3, '1A', TRUE, NULL),( 11,3, '1B', TRUE, NULL),(12,3, '1C', TRUE, NULL),(13,3, '1D', TRUE, NULL);
insert into seats values(14, 4, '1A', TRUE, NULL),(15, 4, '1B', TRUE, NULL),(16, 4, '1C', TRUE, NULL),(17, 4, '1D', TRUE, NULL);
insert into seats values(18, 5, '1A', TRUE, NULL),(19, 5, '1B', TRUE, NULL),(20, 5, '1C', TRUE, NULL),(21, 5, '1D', TRUE, NULL);
insert into seats values(22, 7, '1A', TRUE, NULL),(23, 7, '1B', TRUE, NULL),(27, 7, '1C', TRUE, NULL),(28, 7, '1D', TRUE, NULL),(29, 7, '1E', TRUE, NULL),(30, 7, '1F', TRUE, NULL),(31,7,'1G', TRUE, NULL),(32,7,'1H', TRUE, NULL);
insert into seats values(33, 8, '1A', TRUE, NULL),(34, 8, '1B', TRUE, NULL),(35, 8, '1C', TRUE, NULL),(36, 8, '1D', TRUE, NULL),(37, 8, '1E', TRUE, NULL),(38, 8, '1F', TRUE, NULL),(39, 8, '1G', TRUE, NULL),(40, 8, '1H', TRUE, NULL);
insert into seats values(41, 9, '1A', TRUE, NULL),(42, 9, '1B', TRUE, NULL),(43, 9, '1C', TRUE, NULL),(44, 9, '1D', TRUE, NULL),(45, 9, '1E', TRUE, NULL),(46, 9, '1F', TRUE, NULL),(47, 9, '1G', TRUE, NULL),(48, 9, '1H', TRUE, NULL);
insert into seats values(49, 10, '1A', TRUE, NULL),(50, 10, '1B', TRUE, NULL),(51, 10, '1C', TRUE, NULL),(52, 10, '1D', TRUE, NULL),(53, 10, '1E', TRUE, NULL),(54, 10, '1F', TRUE, NULL),(55, 10, '1G', TRUE, NULL),(56, 10, '1H', TRUE, NULL);    
insert into seats values (57, 11, '1A', TRUE, NULL),(58, 11, '1B', TRUE, NULL),(59, 11, '1C', TRUE, NULL),(60, 11, '1D', TRUE, NULL),(61, 11, '1E', TRUE, NULL),(62, 11, '1F', TRUE, NULL),(63, 11, '1G', TRUE, NULL),(64, 11, '1H', TRUE, NULL);
insert into seats values (65, 12, '1A', TRUE, NULL),(66, 12, '1B', TRUE, NULL),(67, 12, '1C', TRUE, NULL),(68, 12, '1D', TRUE, NULL),(69, 12, '1E', TRUE, NULL),(70, 12, '1F', TRUE, NULL),(71, 12, '1G', TRUE, NULL),(72, 12, '1H', TRUE, NULL);
insert into seats values (73, 13, '1A', TRUE, NULL),(74, 13, '1B', TRUE, NULL),(75, 13, '1C', TRUE, NULL),(76, 13, '1D', TRUE, NULL),(77, 13, '1E', TRUE, NULL),(78, 13, '1F', TRUE, NULL),(79, 13, '1G', TRUE, NULL),(80, 13, '1H', TRUE, NULL);
insert into seats values (81, 14, '1A', TRUE, NULL),(82, 14, '1B', TRUE, NULL),(83, 14, '1C', TRUE, NULL),(84, 14, '1D', TRUE, NULL),(85, 14, '1E', TRUE, NULL),(86, 14, '1F', TRUE, NULL),(87, 14, '1G', TRUE, NULL),(88, 14, '1H', TRUE, NULL);
insert into seats values(89, 15, '1A', TRUE, NULL),(90, 15, '1B', TRUE, NULL),(91, 15, '1C', TRUE, NULL),(92, 15, '1D', TRUE, NULL),(93, 15, '1E', TRUE, NULL),(94, 15, '1F', TRUE, NULL),(95, 15, '1G', TRUE, NULL),(96, 15, '1H', TRUE, NULL);
insert into seats values(97, 16, '1A', TRUE, NULL),(98, 16, '1B', TRUE, NULL),(99, 16, '1C', TRUE, NULL),(100, 16, '1D', TRUE, NULL),(101, 16, '1E', TRUE, NULL),(102, 16, '1F', TRUE, NULL),(103, 16, '1G', TRUE, NULL),(104, 16, '1H', TRUE, NULL);
insert into seats values(105, 17, '1A', TRUE, NULL),(106, 17, '1B', TRUE, NULL),(107, 17, '1C', TRUE, NULL),(108, 17, '1D', TRUE, NULL),(109, 17, '1E', TRUE, NULL),(110, 17, '1F', TRUE, NULL),(111, 17, '1G', TRUE, NULL),(112, 17, '1H', TRUE, NULL);
insert into seats values(113, 18, '1A', TRUE, NULL),(114, 18, '1B', TRUE, NULL),(115, 18, '1C', TRUE, NULL),(116, 18, '1D', TRUE, NULL),(117, 18, '1E', TRUE, NULL),(118, 18, '1F', TRUE, NULL),(119, 18, '1G', TRUE, NULL),(120, 18, '1H', TRUE, NULL);
insert into seats values(121, 19, '1A', TRUE, NULL),(122, 19, '1B', TRUE, NULL),(123, 19, '1C', TRUE, NULL),(124, 19, '1D', TRUE, NULL),(125, 19, '1E', TRUE, NULL),(126, 19, '1F', TRUE, NULL),(127, 19, '1G', TRUE, NULL),(128, 19, '1H', TRUE, NULL);
insert into seats values(129, 20, '1A', TRUE, NULL),(130, 20, '1B', TRUE, NULL),(131, 20, '1C', TRUE, NULL),(132, 20, '1D', TRUE, NULL),(133, 20, '1E', TRUE, NULL),(134, 20, '1F', TRUE, NULL),(135, 20, '1G', TRUE, NULL),(136, 20, '1H', TRUE, NULL);
insert into seats values(137, 21, '1A', TRUE, NULL),(138, 21, '1B', TRUE, NULL),(139, 21, '1C', TRUE, NULL),(140, 21, '1D', TRUE, NULL),(141, 21, '1E', TRUE, NULL),(142, 21, '1F', TRUE, NULL),(143, 21, '1G', TRUE, NULL),(144, 21, '1H', TRUE, NULL);

DELETE FROM booking;
SELECT * FROM Booking;


show tables;
select * from booking;
select * from customer;
select * from flight;
select * from seats;
SELECT * FROM users;

SELECT 
  b.bookingId,
  b.bookingDate,
  b.selectedSeats,
  f.flightNumber,
  f.fromLocation,
  f.toLocation,
  f.departureTime,
  f.arrivalTime
FROM Booking b
JOIN Flight f ON b.flightId = f.flightId
WHERE b.customerId = 1;

SELECT * FROM Customer WHERE email = 'soujanyaravi26@gmail.com';
ALTER TABLE Flight ADD COLUMN price DECIMAL(10,2);
UPDATE Flight SET price = 5000 WHERE flightId = 1;
UPDATE Flight SET price = 35000 WHERE flightId = 2;
UPDATE Flight SET price = 8000 WHERE flightId = 3;
UPDATE Flight SET price = 7500 WHERE flightId = 4;
UPDATE Flight SET price = 6200 WHERE flightId = 5;
UPDATE Flight SET price = 4500 WHERE flightId = 6;
ALTER TABLE Flight ADD COLUMN airline VARCHAR(100);
UPDATE Flight SET airline = 'Air India' WHERE flightId = 1;
UPDATE Flight SET airline = 'British Airways' WHERE flightId = 2;
UPDATE Flight SET airline = 'Air India' WHERE flightId = 3;
UPDATE Flight SET airline = 'IndiGo' WHERE flightId = 4;
UPDATE Flight SET airline = 'SpiceJet' WHERE flightId = 5;
UPDATE Flight SET airline = 'Vistara' WHERE flightId = 6;
update seats set isAvailable = TRUE where flightId = 1;
ALTER TABLE Booking CHANGE customerId userId INT;
ALTER TABLE seats 
CHANGE customerId userId INT;



SELECT seatId, seatNumber, isAvailable 
FROM seats 
WHERE flightId = 1; -- Replace with your flightId
ALTER TABLE seats 
MODIFY seatNumber VARCHAR(10);
ALTER TABLE booking
DROP FOREIGN KEY booking_ibfk_1;
ALTER TABLE booking
ADD CONSTRAINT fk_user
FOREIGN KEY (userId) REFERENCES Users(userId) ON DELETE CASCADE;
SELECT * FROM seats WHERE flightId = 1;
ALTER TABLE customer ADD CONSTRAINT unique_email UNIQUE(email);
UPDATE seats
SET isAvailable = TRUE
WHERE flightId = 1;
