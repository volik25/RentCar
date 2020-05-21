<?php
//прием запросов с клиента
header("Access-Control-Allow-Origin: *"); 
header("Access-Control-Allow-Methods: GET, PUT, POST, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token , Authorization");

include_once 'repository.php';
include_once './utils/token.php';

$repository = new Repository();
$token = new Token();
if(isset($_GET['key'])){
    switch($_GET['key']){
        case 'check-admin':
            if($decodeToken = checkToken($token, true)){
                if($decodeToken){
                    echo json_encode($decodeToken->isAdmin == "1");
                    return;
                } else {
                    echo json_encode($decodeToken);
                    return;
                }
                
            }
            echo json_encode(false);
            return;
        case 'get-cars':
            echo json_encode($repository->GetCars($_GET['limit']));
            return;
        case 'get-places':
            echo json_encode($repository->GetPlaces());
            return;
        case 'add-place':
            if($decodeToken = checkToken($token, true)){
                $data = json_decode(file_get_contents("php://input"));
                echo json_encode($repository->AddPlace($data));
            }
            return;
        case 'update-place':
            if($decodeToken = checkToken($token, true)){
                $data = json_decode(file_get_contents("php://input"));
                echo json_encode($repository->UpdatePlace($data));
            }
            return;
        case 'delete-place':
            if($decodeToken = checkToken($token, true)){
                echo json_encode($repository->DeletePlace($_GET['placeId']));
            }
            return;
        case 'get-car':
            echo json_encode($repository->GetCar($_GET['carId']));
            return;
        case 'remove-car':
            if($decodeToken = checkToken($token, true)){
                $data = json_decode(file_get_contents("php://input"));
                echo json_encode($repository->RemoveCar($data));
            }
            return;
        case 'get-orders':
            if($decodeToken = checkToken($token, true)){
                echo json_encode($repository->GetOrders($decodeToken->id, true, $_GET['limit']));
                return;
            }
            if($decodeToken = checkToken($token)){
                echo json_encode($repository->GetOrders($decodeToken->id, false, $_GET['limit']));
            }
            else{
                echo json_encode($repository->GetOrders(null, null, $_GET['limit']));
            }
            return;
        case 'add-order':
            if($decodeToken = checkToken($token)){
                $data = json_decode(file_get_contents("php://input"));
                echo json_encode($repository->AddOrder($decodeToken->id, $data));
            }
            return;
        case 'update-statuses':
            if($decodeToken = checkToken($token, true)){
                $data = json_decode(file_get_contents("php://input"));
                echo json_encode($repository->UpdateStatuses($data));
            }
            return;
        case 'sign-in':
            $data = json_decode(file_get_contents("php://input"));
            echo json_encode($repository->SignIn($data));
            return;
        case 'sign-up':
            $data = json_decode(file_get_contents("php://input"));
            echo json_encode($repository->SignUp($data));
            return;
        case 'get-user':
            if($decodeToken = checkToken($token)){
                $data = json_decode(file_get_contents("php://input"));
                echo json_encode($repository->getUser($decodeToken->id));
                return;
            }
            return;
        case 'add-car':
            if($decodeToken = checkToken($token, true)){
                $data = json_decode(file_get_contents("php://input"));
                echo json_encode($repository->AddCar($data));
            }
            return;
        case 'update-car':
            if($decodeToken = checkToken($token, true)){
                $data = json_decode(file_get_contents("php://input"));
                echo json_encode($repository->UpdateCar($data));
            }
            return;
        case 'update-user':
            if($decodeToken = checkToken($token)){
                $data = json_decode(file_get_contents("php://input"));
                echo json_encode($repository->updateUser($decodeToken->id, $data));
            }
            return;
        case 'update-order':
            if($decodeToken = checkToken($token)){
                $data = json_decode(file_get_contents("php://input"));
                echo json_encode($repository->UpdateOrder($data));
            }
            return;
        case 'remove-order':
            if($decodeToken = checkToken($token)){
                echo json_encode($repository->RemoveOrder($_GET['orderId']));
            }
            return;
        case 'upload-img':
            if($decodeToken = checkToken($token, true)){
                echo json_encode($repository->UploadImg($_FILES['CarImage']));
            } else {
                echo json_encode(array("message" => "В доступе отказано"));
            }
            return;
        default: 
            echo json_encode(array("message" => "Ключ запроса не найден"));
            return;
    }

} else {
    http_response_code(500);
    echo json_encode(array("message" => "Отсутствует ключ запроса."));
}

function checkToken($token, $checkAdmin = false) {
    try{
        if(!isset($_GET['token'])){
            return false;
        }
        $data = $token->decode($_GET['token']);
        if($checkAdmin && (!isset($data->isAdmin) || !$data->isAdmin)){
            return false;
        }
        return $data;
        
    } catch(Exception $e) {
        return false;
    }
}
?>