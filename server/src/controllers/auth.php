<?php 
use \Psr\Http\Message\ServerRequestInterface as Request;
use \Psr\Http\Message\ResponseInterface as Response;

require '../src/data/authData.php';
require '../src/TokenGenerator.php';



class AuthController {


    public function register(Request $request, Response $response, array $args) {
         
         $name = $request->getParam('name');
         $password =  password_hash($request->getParam('password'), PASSWORD_DEFAULT);
         $firstName = $request->getParam('firstName');
         $lastName = $request->getParam('lastName');
         $email = $request->getParam('email');
         
         $userToAdd = ['name'=>$name,
                       'password'=>$password,
                        'firstName'=>$firstName,
                        'lastName'=>$lastName,
                        'email'=>$email];

         $authData = new AuthData();
         $authData->add($userToAdd);
    }

    public function login(Request $request, Response $response, array $args) {

        $name = $request->getParam('name');
        $password = $request->getParam('password');

        $userToLogIn = ['name'=>$name, 'password'=>$password];

        $authData = new AuthData();
        $loggedUser = $authData->login($userToLogIn);


        if ($loggedUser) {
            $jwt = TokenGenerator::getToken($loggedUser);
            return $response->withJson([
                "user" => $loggedUser,
                "token" => $jwt
            ]);
        } else {
            return $response->withStatus(500);
        }
       
        
        
        
        
    }

}
