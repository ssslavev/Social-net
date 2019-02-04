import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { ImagesService } from 'src/app/services/images.service';

@Component({
  selector: 'app-user-pictures',
  templateUrl: './user-pictures.component.html',
  styleUrls: ['./user-pictures.component.css']
})
export class UserPicturesComponent implements OnInit {
 
  images;

  ngOnInit(): void {
    
    this.imagesService.getAllImages()
    .subscribe(images=> this.images = images);

  }

  uploadedFiles: any[] = [];

    constructor(private messageService: MessageService,
                private imagesService: ImagesService) {}

    onUpload(event) {
        for(let file of event.files) {
            this.uploadedFiles.push(file);
        }

        this.messageService.add({severity: 'info', summary: 'File Uploaded', detail: ''});
    }

}
