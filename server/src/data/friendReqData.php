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
}