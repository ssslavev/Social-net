<?php

use \Psr\Http\Message\ServerRequestInterface as Request;
use \Psr\Http\Message\ResponseInterface as Response;

require '../src/data/friendReqData.php';

class FriendReqController {

    public function sendFriendReq(Request $request, Response $response, array $args) {

        $loggedUserId =  intval($request->getParam('loggedUserId'));
        $id =  intval($request->getParam('id'));
        $loggedUserName = $request->getParam('loggedUserName');
        
        $friendReqData = new FriendReqData();

        $friendReqData->sendFriendReq($loggedUserId, $id, $loggedUserName);

    }

    public function getFromReq(Request $request, Response $response, array $args) {

        $loggedUserId =  intval($request->getParam('loggedUserId'));
        $id =  intval($request->getParam('id'));

        $friendReqData = new FriendReqData();

         $request = $friendReqData->getFromReq($loggedUserId, $id);

        return $response->withJson($request);
    }

    public function getToReq(Request $request, Response $response, array $args) {

        $loggedUserId =  intval($request->getParam('loggedUserId'));
        $id =  intval($request->getParam('id'));

        $friendReqData = new FriendReqData();

         $request = $friendReqData->getFromReq($loggedUserId, $id);

        return $response->withJson($request);
    }

}