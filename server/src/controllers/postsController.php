<?php

use \Psr\Http\Message\ServerRequestInterface as Request;
use \Psr\Http\Message\ResponseInterface as Response;

require '../src/data/postsData.php';

class PostsController {

    public function addPost(Request $request, Response $response, array $args) {

        $content = $request->getParam('content');
        $created_at = date('Y-m-d H:i:s');
        $user_id = $request->getParam('user_id');

        $post = ['content'=>$content, 'created_at'=>$created_at, 'user_id'=>$user_id];

        $postsData = new PostsData();
        $postsData =  $postsData->addPost($post);

    }

    public function getAllPosts(Request $request, Response $response, array $args) {

        $postsData = new PostsData();
        
        $posts = $postsData->getAllPosts();

        return $response->withJson($posts);

    }

    public function getPostById(Request $request, Response $response, array $args) {

        $id = $request->getAttribute('id');

        $postsData = new PostsData();
        $post = $postsData->getPostById($id);

        return $response->withJson($post);

    }

    public function getPostsByUserId(Request $request, Response $response, array $args) {
        
        $userId = $request->getAttribute('id');

        $postsData = new PostsData();
        $posts = $postsData->getPostsByUserId($userId);

        return $response->withJson($posts);
    }
}