<?php 
use \Psr\Http\Message\ServerRequestInterface as Request;
use \Psr\Http\Message\ResponseInterface as Response;

require_once '../src/controllers/auth.php';
require_once '../src/controllers/usersController.php';
require_once '../src/controllers/postsController.php';


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
                "/api/users/posts/{id}"        ]
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



$container = $app->getContainer();
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



