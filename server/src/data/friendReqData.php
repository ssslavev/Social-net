<?php

class FriendReqData {

    public function sendFriendReq($loggedUserId, $id, $loggedUserName) {
        
        $sql = "INSERT  INTO friendreq (from_user, to_user, from_name) VALUES (:from_user, :to_user, :from_name)";

        try {
            $db = new Db();
            $db = $db->connect();
    
            $stmt = $db->prepare($sql);
            $stmt->bindParam(':from_user', $loggedUserId);
            $stmt->bindParam(':to_user', $id);
            $stmt->bindParam(':from_name', $loggedUserName);
    
            $stmt->execute();
            
                
        } catch(PDOException $e) {
            echo $e->getMessage();
        }
    }

    public function getFromReq($loggedUserId, $id) {

        $sql = "SELECT friend_req_id  FROM friendreq  WHERE from_user =:from_user AND to_user=:to_user";

        try {
            $db = new Db();
            $db = $db->connect();
    
            $stmt = $db->prepare($sql);
            $stmt->bindParam(':from_user', $loggedUserId);
            $stmt->bindParam(':to_user', $id);
            $stmt->execute();

            $request =  $stmt->fetchAll(PDO::FETCH_OBJ);
            
            return $request;
                
        } catch(PDOException $e) {
            echo $e->getMessage();
        }
    }

    public function getToReq($loggedUserId, $id) {

        $sql = "SELECT friend_req_id  FROM friendreq  WHERE from_user =:from_user AND to_user=:to_user";

        try {
            $db = new Db();
            $db = $db->connect();
    
            $stmt = $db->prepare($sql);
            $stmt->bindParam(':from_user', $id);
            $stmt->bindParam(':to_user', $loggedUserId);
            $stmt->execute();

            $request =  $stmt->fetchAll(PDO::FETCH_OBJ);
            
            return $request;
                
        } catch(PDOException $e) {
            echo $e->getMessage();
        }
    }

    public function acceptReq($loggedUserId, $id) {

        $sql = "INSERT  INTO friends (user_one, user_two) VALUES (:user_one, :user_two)";

        try {
            $db = new Db();
            $db = $db->connect();
    
            $stmt = $db->prepare($sql);
            $stmt->bindParam(':user_one', $loggedUserId);
            $stmt->bindParam(':user_two', $id);
            $stmt->execute();


            
                
        } catch(PDOException $e) {
            echo $e->getMessage();
        }

    }

    public function getFriends($loggedUserId, $id) {

        $sql = "SELECT friends_id  FROM friends  WHERE user_one =:user_one AND user_two=:user_two
                OR user_one = :user_two AND user_two = :user_one";

        try {
            $db = new Db();
            $db = $db->connect();
    
            $stmt = $db->prepare($sql);
            $stmt->bindParam(':user_one', $loggedUserId);
            $stmt->bindParam(':user_two', $id);
            $stmt->execute();

            $friends =  $stmt->fetchAll(PDO::FETCH_OBJ);
            
            return $friends;
                
        } catch(PDOException $e) {
            echo $e->getMessage();
        }

    }

    public function getAllRequests($loggedUserId) {
        $sql = "SELECT friend_req_id, from_user, from_name  FROM friendreq  WHERE  to_user=:to_user";

        try {
            $db = new Db();
            $db = $db->connect();
    
            $stmt = $db->prepare($sql);
            $stmt->bindParam(':to_user', $loggedUserId);
            $stmt->execute();

            $request =  $stmt->fetchAll(PDO::FETCH_OBJ);
            
            return $request;
                
        } catch(PDOException $e) {
            echo $e->getMessage();
        }
    }

    public function deleteRequest($loggedUserId, $id) {
        $sql = "DELETE FROM friendreq  WHERE from_user=:from_user AND  to_user=:to_user";

        try {
            $db = new Db();
            $db = $db->connect();
    
            $stmt = $db->prepare($sql);
            $stmt->bindParam(':to_user', $loggedUserId);
            $stmt->bindParam(':from_user', $id);
            $stmt->execute();

           // $request =  $stmt->fetchAll(PDO::FETCH_OBJ);
            
            //return $request;
                
        } catch(PDOException $e) {
            echo $e->getMessage();
        }
    }
}