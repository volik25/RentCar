<?php
    //обработка запросов
    include_once './utils/token.php';
    include_once './utils/database.php';
    include_once './utils/filesManager.php';
    include_once 'models.php';
    class Repository{
        private $database;
        private $token;
        private $filesManager;
        private $baseUrl = 'http://vdknf.beget.tech/RentCarBack';

        public function __construct()
        {
            $this->database = new DataBase();
            $this->token = new Token();
            $this->filesManager = new FilesManager();
        }

        public function GetCars($limit){
            $queryText = "SELECT * FROM cars ORDER BY name ASC";
            if($limit == 1){
                $queryText="SELECT * FROM cars ORDER BY price ASC LIMIT 2";
            };
            if($limit == 2){
                $queryText="SELECT * FROM cars ORDER BY price DESC LIMIT 2";
            }
            $query = $this->database->db->query($queryText);
            $query->setFetchMode(PDO::FETCH_CLASS, 'Car');
            return $query->fetchAll();
        }

        public function GetPlaces(){
            $query = $this->database->db->query("SELECT * FROM places ORDER BY name ASC");
            $query->setFetchMode(PDO::FETCH_CLASS, 'Place');
            return $query->fetchAll();
            
        }

        public function AddPlace($place){
            if(!isset($place->name) || !$place->name){
                return array("message" => "Укажите название места сдачи", "method" => "AddPlace", "requestData" => $place);
            }
            $insert = $this->database->genInsertQuery((array)$place, 'places');
            $query = $this->database->db->prepare($insert[0]);
            if($insert[1][0]!=null){
                $query->execute($insert[1]);
            }
            return $this->database->db->lastInsertId();
        }

        public function UpdatePlace($place){
            if(!isset($place->id) || !$place->id){
                return array("message" => "Укажите id места сдачи", "method" => "UpdatePlace", "requestData" => $place);
            }
            if(!isset($place->name) || !$place->name){
                return array("message" => "Укажите название места сдачи", "method" => "UpdatePlace", "requestData" => $place);
            }

            $placeId = $place->id;
            unset($place->id);
            $a = $this->database->genUpdateQuery(array_keys((array)$place), array_values((array)$place), "places", $placeId);
            $query = $this->database->db->prepare($a[0]);
            $query->execute($a[1]);
            return array('message' => 'Место обновлено');
        }

        public function DeletePlace($placeId){
            $query = $this->database->db->prepare("DELETE FROM places WHERE id = ?");
            $query->execute(array($placeId));
            return array('message' => 'Место удалено');
        }

        public function UploadImg($file){
            $newFileName = $this->filesManager->upload($file, 'Files', uniqid());
            return $this->baseUrl.'/Files'.'/'.$newFileName;
        }

        public function GetCar($carId){
            if($carId == null){
                return array("message" => "Введите id автомобиля", "method" => "GetCar", "requestData" => $carId);
            }

            $query = $this->database->db->prepare("SELECT * from cars WHERE id = ?");
            $query->execute(array($carId));
            $query->setFetchMode(PDO::FETCH_CLASS, 'Car');
            
            return $query->fetch();
            
        }

        public function RemoveCar($car){
            $id = $car->carId;
            $file = $car->filelink;
            if($id == null){
                return array("message" => "Введите id автомобиля", "method" => "RemoveCar", "requestData" => $carId);
            }
            $query = $this->database->db->prepare("delete from cars where id= ?");
            $query->execute(array($id));
            $this->filesManager->remove($file);
            return array('message' => 'Автомобиль удален');
        }

        public function GetPlace($id){
            if($id == null){
                return array("message" => "Введите id места", "method" => "GetPlace", "requestData" => $id);
            }

            $query = $this->database->db->prepare("SELECT * from places WHERE id = ?");
            $query->execute(array($id));
            $query->setFetchMode(PDO::FETCH_CLASS, 'Place');
            
            return $query->fetch();
            
        }

        public function GetOrders($userId, $isAdmin, $limit){
            if($limit == 'true'){
               $text = "SELECT * from carOrders WHERE status = 3 ORDER BY dateFrom DESC";
               //return array("message" => "limit!", "method" => "GetOrders", "requestData" => $limit);
            }
            else{
                if($userId == null){
                    return array("message" => "Введите id пользователя", "method" => "GetOrders", "requestData" => $userId);
                }
                //return array("message" => "noLimit!", "method" => "GetOrders", "requestData" => $limit);
                $text = "SELECT * from carOrders WHERE userId = ? ORDER BY status ASC, dateFrom DESC";
                if($isAdmin){
                    $text = "SELECT * from carOrders ORDER BY status ASC, dateFrom DESC";
                }
            }
            //return array("message" => "notworking!", "method" => "GetOrders", "requestData" => array($limit, $userId, $isAdmin));
            $query = $this->database->db->prepare($text);
            $query->execute(array($userId));
            $query->setFetchMode(PDO::FETCH_CLASS, 'Order');
            $orders = [];
            while ($order = $query->fetch()) {
                $order->car = $this->GetCar($order->carId);
                $order->place = $this->GetPlace($order->placeId);
                if($isAdmin){
                    $order->user = $this->getUser($order->userId);
                }
                unset($order->userId);
                $orders[] = $order;
            }
            return $orders;
            
        }

        public function AddOrder($userId, $order){
            if($userId == null){
                return array("message" => "Вы не вошли", "method" => "AddOrder", "requestData" => array("userId" => $userId, "order" => $order));
            }
            if($order == null){
                return array("message" => "Заказ пуст", "method" => "AddOrder", "requestData" => array("userId" => $userId, "order" => $order));
            }
            $order->userId = $userId;
            $insert = $this->database->genInsertQuery((array)$order, 'carOrders');
            $query = $this->database->db->prepare($insert[0]);
            if($insert[1][0]!=null){
                $query->execute($insert[1]);
            }
            return $this->database->db->lastInsertId();
            
        }
        
        public function UpdateStatuses($orders){
            if(!$orders){
                return array("message" => "Измененных статусов нет!", "method" => "UpdateStatuses", "requestData" => $orders);
            }
            foreach($orders as $order){
                $orderId = $order->id;
                unset($order->id);
                $a = $this->database->genUpdateQuery(array_keys((array)$order), array_values((array)$order), "carOrders", $orderId);
                $query = $this->database->db->prepare($a[0]);
                $query->execute($a[1]);
            }
            return array("message" => "Статусы обновлены!");
        }

        public function UpdateOrder($order){
            if(!$order || !isset($order->id) || !$order->id){
                return array("message" => "Укажите id заказа", "method" => "UpdateOrder", "requestData" => $order);
            }

            $orderId = $order->id;
            unset($order->id);
            $a = $this->database->genUpdateQuery(array_keys((array)$order), array_values((array)$order), "carOrders", $orderId);
            $query = $this->database->db->prepare($a[0]);
            $query->execute($a[1]);
            return array('message' => 'Заказ обновлен');
        }

        public function RemoveOrder($orderId){
            if(!$orderId){
                return array("message" => "Укажите id заказа", "method" => "RemoveOrder", "requestData" => $orderId);
            }
            $query = $this->database->db->prepare("UPDATE carOrders SET status=4 WHERE id=?");
            $query->execute(array($orderId));
            return array('message' => 'Заказ отменен');
        }

        public function SignIn($user = null){
            if($user != null){
                $sth = $this->database->db->prepare("SELECT id, password, isAdmin FROM users WHERE email = ? LIMIT 1");
                $sth->setFetchMode(PDO::FETCH_CLASS, 'User');
                $sth->execute(array($user->email));
                $fullUser = $sth->fetch();
                
                if($fullUser){
                    if(!password_verify($user->password, $fullUser->password)){
                        return false;
                    }
                    return $this->token->encode(array("id" => $fullUser->id, "isAdmin" => $fullUser->isAdmin));
                } else {
                    return false;
                }
                
            } else {
                return array("message" => "Введите данные для регистрации");
            }
        }
        
        public function SignUp($user = null){
            if($user != null){
                try{
                    if($this->EmailExists($user->email)){
                        return false;
                    }
                    $user->password = password_hash($user->password, PASSWORD_BCRYPT);
                    $insert = $this->database->genInsertQuery((array)$user, 'users');
                    $query = $this->database->db->prepare($insert[0]);
                    if ($insert[1][0]!=null) {
                        $query->execute($insert[1]);
                    }
                    return $this->token->encode(array("id" => $this->database->db->lastInsertId()));
                } catch(Exception $e) {
                    return false;
                }
                
            } else {
                return false;
            }
        }

        public function getUser($userId){
            $sth = $this->database->db->prepare("SELECT name, surname, secondname, phone, email FROM users WHERE id = ? LIMIT 1");
            $sth->setFetchMode(PDO::FETCH_CLASS, 'User');
            $sth->execute(array($userId));
            return $sth->fetch();
        }

        public function updateUser($userId, $user){
            if(!$userId || $userId == 0){
                return array("message" => "Укажите id пользователя", "method" => "updateUser", "requestData" => array($userId, $user));
            }
            if(!$user){
                return array("message" => "Укажите данные", "method" => "updateUser", "requestData" => $user);
            }
            unset ($user->id);
            $a = $this->database->genUpdateQuery(array_keys((array)$user), array_values((array)$user), "users", $userId);
            $query = $this->database->db->prepare($a[0]);
            $query->execute($a[1]);
            return array('message' => 'Пользователь обновлен');
        }

        public function AddCar($car = null){
            if($car != null){
                try{
                    $insert = $this->database->genInsertQuery((array)$car, 'cars');
                    $query = $this->database->db->prepare($insert[0]);
                    if ($insert[1][0]!=null) {
                        $query->execute($insert[1]);
                    }
                    return $this->database->db->lastInsertId();
                } catch(Exception $e) {
                    return array("message" => "Ошибка добавления автомобиля", "error" => $e->getMessage());
                }
                
            } else {
                return array("message" => "Введите данные автомобиля");
            }
        }
        
        public function UpdateCar($car){
            if($car == null || !isset($car->id)){
                return array("message" => "Укажите id автомобиля", "method" => "UpdateCar", "requestData" => $car);
            }

            $carId = $car->id;
            unset($car->id);
            if($car->oldImg && $car->img != $car->oldImg){
                $this->filesManager->remove($car->oldImg);
            }
            unset($car->oldImg);
            $a = $this->database->genUpdateQuery(array_keys((array)$car), array_values((array)$car), "cars", $carId);
            $query = $this->database->db->prepare($a[0]);
            $query->execute($a[1]);
            return array('message' => 'Автомобиль обновлен');
        }

        public function EmailExists($email){
            $query = "SELECT id, email FROM users WHERE email = ?";
 
            // подготовка запроса 
            $stmt = $this->database->db->prepare( $query );
            // инъекция 
            //$email=htmlspecialchars(strip_tags($email));
            // выполняем запрос 
            $stmt->execute(array($email));
        
            // получаем количество строк 
            $num = $stmt->rowCount();

            return $num > 0;
        }

    }
?>