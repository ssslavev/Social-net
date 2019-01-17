<?php

use \Psr\Http\Message\ServerRequestInterface as Request;
use \Psr\Http\Message\ResponseInterface as Response;

require '../src/data/usersData.php';

class UsersController {

    public function getAllUsers(Request $request, Response $response, array $args) {

        $usersData = new UsersData();
        $users =  $usersData->getAll();

        

        $newResponse = $response->withJson($users);
        return $newResponse;
    }

    public function getUser(Request $request, Response $response, array $args) {
        
        $id = $request->getAttribute('id');

        $usersData = new UsersData();
        $user = $usersData->getUserById($id);

        $newRespone = $response->withJson($user);
        return $newRespone;

    }

    public function getUsersWithPosts(Request $request, Response $response, array $args) {

        $usersData = new UsersData();
        $user = $usersData->getUsersWithPosts();

        return $response->withJson($user);

    }
}
