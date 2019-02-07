import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { ImagesService } from 'src/app/services/images.service';
import { ActivatedRoute } from '@angular/router';
import { NotificationsService } from 'src/app/services/notifications.service';

@Component({
  selector: 'app-user-pictures',
  templateUrl: './user-pictures.component.html',
  styleUrls: ['./user-pictures.component.css']
})
export class UserPicturesComponent implements OnInit {

  images;
  selectedFile: File;
  fd: FormData;
  isDisabled = true;
  userId;
  imagesSubscription;

  ngOnInit(): void {

    this.route.parent.params.subscribe(params => {
      this.userId = params.id
      this.imagesService.getImagesByUserId(this.userId)
        .subscribe(images => this.images = images);
    })
  }

  uploadedFiles: any[] = [];

  constructor(private messageService: MessageService,
    private imagesService: ImagesService,
    private route: ActivatedRoute,
    private notificationService: NotificationsService) { }

  onFileSelect(event) {
    this.selectedFile = <File>event.target.files[0];
    this.isDisabled = false;


  }

  uploadFile() {
    console.log('here');
    this.fd = new FormData();
    this.fd.append('image', this.selectedFile, this.selectedFile.name);
    this.imagesService.addImage(localStorage.getItem('logged-user-id'), this.fd)
      .subscribe(() => { console.log("image is uploaded")
                         this.refreshData();},
        error => console.log(error));
  }

  private refreshData(): void {
    this.notificationService.emitSpiner(true);
    // console.log('refresh')
    this.imagesSubscription = this.imagesService.getImagesByUserId(this.userId).subscribe(images => {
      this.images = images;
      //this.subscribeToData();
    },
      error => console.log(error),
      () => this.notificationService.emitSpiner(false));

  }
}
