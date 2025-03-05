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
INSERT INTO Seat (flightId, seatNumber, isAvailable)
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
