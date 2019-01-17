<?php

class PostsData {

    public function addPost($post) {

        list('content'=>$content, 'created_at'=>$created_at, 'user_id'=>$user_id) = $post;

        $sql = "INSERT  INTO posts (content, created_at, user_id) VALUES (:content, :created_at, :user_id)";

        try {
            $db = new Db();
            $db = $db->connect();
    
            $stmt = $db->prepare($sql);
            $stmt->bindParam(':content', $content);
            $stmt->bindParam(':created_at', $created_at);
            $stmt->bindParam('user_id', $user_id);
    
            $stmt->execute();
            
                
        } catch(PDOException $e) {
            echo $e->getMessage();
        }
    }

    public function getAllPosts() {

        $sql = 'SELECT post_id, content, created_at, u.user_id, name FROM
        posts p LEFT JOIN users u
        ON p.user_id = u.user_id';

        try {
            $db = new Db();
            $db = $db->connect();
    
            $stmt = $db->query($sql);
            $posts = $stmt->fetchAll(PDO::FETCH_OBJ);
            

            return $posts; 
                
        } catch(PDOException $e) {
            echo $e->getMessage();
        }


    }

    public function getPostById($id) {

        $sql = "SELECT post_id, content, created_at FROM posts WHERE post_id = :id";

        try {
            $db = new Db();
            $db = $db->connect();
    
            $stmt = $db->prepare($sql);
            $stmt->bindParam(':id', $id);
            $stmt->execute();
            $post = $stmt->fetchAll(PDO::FETCH_OBJ);
    
            return $post;    
        } catch(PDOException $e) {
            echo $e->getMessage();
        }
        }
    }

