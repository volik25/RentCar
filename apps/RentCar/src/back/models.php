<?php
    class User {
        public $id;
        public $name;
        public $surname;
        public $secondname;
        public $phone;
        public $email;
    }

    class Car {
        public $id;
        public $img;
        public $name;
        public $description;
        public $price;
        public $bodyType;
        public $fuelType;
        public $fuelCity;
        public $fuelTrack;
        public $enginePower;
        public $engineVolume;
        public $maxSpeed;
        public $accelerationTime;
        public $volumePerHundred;
        public $kpp;
        public $gears;
        public $wheelDrive;
        public $doors;
        public $sits;
        public $airbags;
        public $AC;
        public $steering;
        public $trunkVolume;
        public $createYear;
    }

    class Place {
        public $id;
        public $name;
    }

    class Order {
        public $id;
        public $userId;
        public $carId;
        public $placeId;
        public $dateFrom;
        public $dateTo;
        public $orderSum;
        public $time;

        public $user;
        public $car;
        public $place;
    }
?>