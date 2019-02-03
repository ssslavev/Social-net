<?php

class ImagesData {

    public function uploadImage($image_dir) {
        
        $sql = "INSERT  INTO images (image_dir) VALUES (:image_dir)";

        try {
            $db = new Db();
            $db = $db->connect();
    
            $stmt = $db->prepare($sql);
            $stmt->bindParam(':image_dir', $image_dir);
    
            $stmt->execute();
            
                
        } catch(PDOException $e) {
            echo $e->getMessage();
        }
    }
}