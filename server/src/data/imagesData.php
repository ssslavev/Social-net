<?php

class ImagesData {

    public function uploadImage($image_dir, $image_data, $user_id) {
        var_dump($image_data."tets");
        $sql = "INSERT  INTO images (image_dir, image_data, user_id) VALUES (:image_dir, :image_data, :user_id)";

        try {
            $db = new Db();
            $db = $db->connect();
    
            $stmt = $db->prepare($sql);
            $stmt->bindParam(':image_dir', $image_dir);
            $stmt->bindParam(':image_data', $image_data);
            $stmt->bindParam(':user_id', $user_id);
    
            $stmt->execute();
            
                
        } catch(PDOException $e) {
            echo $e->getMessage();
        }
    }

    public function getAllImages() {

        $sql = "SELECT  image_data FROM images";

        try {
            $db = new Db();
            $db = $db->connect();
    
            $stmt = $db->query($sql);
            $images = $stmt->fetchAll(PDO::FETCH_ASSOC);
            //var_dump($images);
            $result = array();
            $result2 = array();
            foreach ($images as $field => $image) {
                //array_push($result, $image->image_data);

                //$result[$field] = $image['image_data'];
            }

            return $images;            
            
        } catch(PDOException $e) {
            echo $e->getMessage();
        }
        }
}