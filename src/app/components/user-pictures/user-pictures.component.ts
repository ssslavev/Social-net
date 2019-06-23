import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NotificationsService } from 'src/app/core/services/notifications.service';
import { ImagesService } from 'src/app/core/services/images.service';

@Component({
  selector: 'app-user-pictures',
  templateUrl: './user-pictures.component.html',
  styleUrls: ['./user-pictures.component.css']
})
export class UserPicturesComponent implements OnInit {

  constructor(
    private imagesService: ImagesService,
    private route: ActivatedRoute,
    private notificationService: NotificationsService) { }

  images;
  selectedFile: File;
  fd: FormData;
  isDisabled = true;
  userId;
  imagesSubscription;
  imageSrc;

  uploadedFiles: any[] = [];

  ngOnInit(): void {

    this.route.parent.params.subscribe(params => {
      this.userId = params.id;
      this.imagesService.getImagesByUserId(this.userId)
        .subscribe(images => this.images = images);
    });
  }

  onFileSelect(event) {
    this.selectedFile = <File>event.target.files[0];
    this.isDisabled = false;
    const fr = new FileReader();
    fr.readAsDataURL(this.selectedFile);
    fr.onload = (_event) => {

      this.imageSrc = fr.result;
    };

  }

  uploadFile() {
    console.log('here');
    this.fd = new FormData();
    this.fd.append('image', this.selectedFile, this.selectedFile.name);

    this.imagesService.addImage(localStorage.getItem('logged-user-id'), this.fd)
      .subscribe(() => {
        console.log('image is uploaded');
        this.refreshData();
      },
        error => console.log(error));
  }

  private refreshData(): void {
    this.notificationService.changeLoading(true);
    // console.log('refresh')
    this.imagesSubscription = this.imagesService.getImagesByUserId(this.userId).subscribe(images => {
      this.images = images;
      // this.subscribeToData();
    },
      error => console.log(error),
      () => this.notificationService.changeLoading(false));

  }
}
