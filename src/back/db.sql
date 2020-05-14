CREATE TABLE IF NOT EXISTS user(
    id int(10) PRIMARY KEY AUTO_INCREMENT,
    isAdmin bit DEFAULT 0,
    name varchar(255) NOT NULL,
    surname varchar(255) NOT NULL,
    middlename varchar(255),
    email varchar(255) NOT NULL,
    phone varchar (20),
    password varchar(255) NOT NUll
);

CREATE TABLE IF NOT EXISTS car(
    id int(10) PRIMARY KEY AUTO_INCREMENT,
    img varchar(255) NOT NULL,
    name varchar(255) NOT NULL,
    description text NOT NULL,
    price int(10) NOT NULL,
    fuelType varchar(100) NOT NULL,
    engineVolume float,
    enginePower int(10),
    speed float,
    time float,
    volumePerHundred float,
    kpp varchar(100)  NOT NULL,
    driveUnit varchar(100)  NOT NULL,
    places int(2)  NOT NULL,
    backVolume float,
    license varchar(10),
    createYear int(4)
);

CREATE TABLE IF NOT EXISTS place(
    id int PRIMARY KEY AUTO_INCREMENT,
    name varchar(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS carOrder(
    id int(10) PRIMARY KEY AUTO_INCREMENT,
    userId int(10) NOT NULL,
    carId int(10) NOT NULL,
    placeId int(10) NULL,
    dateFrom DATE NOT NULL,
    dateTo DATE NULL,
    orderSum int(10) NOT NULL,
    time varchar(50) NOT NULL,
    status int(2) DEFAULT 1,
    
    FOREIGN KEY (userId) REFERENCES user(id),
    FOREIGN KEY (carId) REFERENCES car(id),
    FOREIGN KEY (placeId) REFERENCES place(id) ON DELETE CASCADE
);
