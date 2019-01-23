<?php 
//require '../src/data/usersData.php';

class AuthData {

    public function add($userToAdd) {
        
        $usersData = new UsersData();

        list('name'=> $name, 'password'=> $password, 'firstName'=>$firstName,
        'lastName'=>$lastName, 'email'=>$email) = $userToAdd;

        $user = $usersData->getUserByName($name);
       

        
            if ($user) {
                throw new Exception("Username already exists!");
                    
            }
       
        $sql = "INSERT INTO Users (name, password, first_name, last_name, email) VALUES (:name, :password, :first_name, :last_name, :email)";

    try {
        $db = new Db();
        $db = $db->connect();

        $stmt = $db->prepare($sql);
        $stmt->bindParam(':name', $name);
        $stmt->bindParam(':password', $password);
        $stmt->bindParam(':first_name', $firstName);
        $stmt->bindParam(':last_name', $lastName);
        $stmt->bindParam(':email', $email);

         $stmt =  $stmt->execute();

         if ($stmt) {
            return ["message"=>"You are registered"];
         }
        
          
    } catch(PDOException $e) {
        echo $e->getMessage();
    }
    }

    public function login($userToLogin) {

        list('name'=> $name, 'password'=> $password) = $userToLogin;

        $sql = 'SELECT user_id, name, password FROM Users WHERE name = :name';

        try {
            $db = new Db();
            $db = $db->connect();
    
            $stmt = $db->prepare($sql);
            $stmt->bindParam(':name', $name);
          
    
            $stmt->execute();
            $result = $stmt->fetch(PDO::FETCH_ASSOC);
    
            if($result || is_null($result)) {
               if(password_verify($password, $result['password'])) {
                  
                   return $result;
                   
               } else {
                   echo 'Invalid password';
               }
    
            } else {
                echo 'no such user';
                return;
            }
    
                
        } catch(PDOException $e) {
            echo $e->getMessage();
        }
    }
}