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
  selectedFile: File;
  fd: FormData;

  ngOnInit(): void {

    this.imagesService.getAllImages()
      .subscribe(images => this.images = images);

  }

  uploadedFiles: any[] = [];

  constructor(private messageService: MessageService,
    private imagesService: ImagesService) { }

  onFileSelect(event) {
    this.selectedFile = <File>event.target.files[0];

    
  }

  uploadFile() {
    console.log('here');
    this.fd = new FormData();
    this.fd.append('image', this.selectedFile, this.selectedFile.name);
    this.imagesService.addImage(localStorage.getItem('logged-user-id'), this.fd)
    .subscribe(()=>console.log("image is uploaded"),
    error=>console.log(error));
  }

}
