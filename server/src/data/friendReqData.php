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
}