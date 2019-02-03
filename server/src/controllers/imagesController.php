<?php

use \Psr\Http\Message\ServerRequestInterface as Request;
use \Psr\Http\Message\ResponseInterface as Response;
use Slim\Http\UploadedFile;



require '../src/data/imagesData.php';


class ImagesController {

    

    public function uploadImage(Request $request, Response $response, array $args) {
        
                

        $image = $request->getUploadedFiles();
        $uploadedImage = $image['image'];
        $extension = pathinfo($uploadedImage->getClientFilename(), PATHINFO_EXTENSION);
        $newFileName = uniqid('', true).".".$extension;
       
        $uploadDir = dirname(getcwd(), 1)."\\uploads\\".$newFileName;
        $img_dir = 'uploads/'.$newFileName;
        echo $img_dir;
        if ($uploadedImage->getError()=== UPLOAD_ERR_OK) {
        
        $tmp_dir = $uploadedImage->file;
        
        move_uploaded_file($tmp_dir, $uploadDir);
         
        }



        $imageData = new ImagesData();
        $imageData->uploadImage($img_dir);
    }
}
