<?php

class UsersData {

    public function getAll() {

        $sql = "SELECT name  FROM users";

        try {
            $db = new Db();
            $db = $db->connect();
    
            $stmt = $db->query($sql);
            $users = $stmt->fetchAll(PDO::FETCH_OBJ);
    
            return $users;    
        } catch(PDOException $e) {
            echo $e->getMessage();
        }
        }

    public function getUserById($id) {

        $sql = "SELECT name, first_name, last_name, email FROM users WHERE user_id = :id";

        try {
            $db = new Db();
            $db = $db->connect();
    
            $stmt = $db->prepare($sql);
            $stmt->bindParam(':id', $id);
            $stmt->execute();
            $user = $stmt->fetchAll(PDO::FETCH_OBJ);
    
            return $user;    
        } catch(PDOException $e) {
            echo $e->getMessage();
        }
     }

     public function getUsersWithPosts() {
         
        $sql = "SELECT u.user_id, name, post_id, content, created_at FROM 
        users u LEFT JOIN posts p
        ON u.user_id = p.user_id";

        try {
            $db = new Db();
            $db = $db->connect();

            $stmt = $db->query($sql);
            $users = $stmt->fetchAll(PDO::FETCH_OBJ);

            return $users;    
        } catch(PDOException $e) {
            echo $e->getMessage();
        }
     }

     public function getUserByName($name) {

        $sql = "SELECT name FROM users WHERE name = :name";

        try {
            $db = new Db();
            $db = $db->connect();
    
            $stmt = $db->prepare($sql);
            $stmt->bindParam(':name', $name);
            $stmt->execute();
            $user = $stmt->fetchAll(PDO::FETCH_OBJ);
    
            return $user;    
        } catch(PDOException $e) {
            echo $e->getMessage();
        }
     }
}

    

