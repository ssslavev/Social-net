<?php 
use \Psr\Http\Message\ServerRequestInterface as Request;
use \Psr\Http\Message\ResponseInterface as Response;

require_once '../src/controllers/auth.php';
require_once '../src/controllers/usersController.php';
require_once '../src/controllers/postsController.php';
require_once '../src/controllers/friendReqController.php';
require_once '../src/controllers/imagesController.php';


$container = new \Slim\Container;
$app = new \Slim\App($container);

$app->add(new Tuupola\Middleware\JwtAuthentication([
    "secure" => false,
    "secret" => "supersecretkeyyoushouldnotcommittogithub",
    "path"=> "/",
    "ignore"=>["/api/users/login",
                "/api/users",
                "/api/users/register",
                "/api/posts",
                "/api/users/posts/{id}" ,
                "api/users/friends/request",
                "api/users/friends/acceptReq",
                "api/users/{id}/pictures"]
]));



$app->post('/api/users/register', '\AuthController:register');
$app->post('/api/users/login', '\AuthController:login');
$app->get('/api/users', '\UsersController:getAllUsers');
$app->get('/api/users/{id}', '\UsersController:getUser' );
$app->post('/api/posts', '\PostsController:addPost');
$app->get('/api/posts', '\PostsController:getAllPosts');
$app->get('/api/posts/{id}', '\PostsController:getPostById'); 
$app->get('/api/usersandposts', '\UsersController:getUsersWithPosts');
$app->get('/api/users/posts/{id}', '\PostsController:getPostsByUserId');
$app->post('/api/users/friends/request', '\FriendReqController:sendFriendReq');
$app->post('/api/users/friends/fromreq', '\FriendReqController:getFromReq');
$app->post('/api/users/friends/toreq', '\FriendReqController:getToReq');
$app->post('/api/users/friends/acceptreq', '\FriendReqController:acceptReq');
$app->post('/api/users/friends', '\FriendReqController:getFriends');
$app->post('/api/users/{id}/pictures', '\ImagesController:uploadImage' );



$container = $app->getContainer();

$container['upload_directory'] = __DIR__ . '/uploads';

$container['AuthController'] = function() {
    return new AuthController();
};

$container = $app->getContainer();
$container['UsersController'] = function() {
    return new UsersController();
};

$container = $app->getContainer();
$container['postsController'] = function() {
    return new postsController();
};

$container = $app->getContainer();
$container['friendReqController'] = function() {
    return new friendReqController();
};

$container = $app->getContainer();
$container['imagesController'] = function() {
    return new ImagesController();
};



