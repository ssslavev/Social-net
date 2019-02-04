import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ToastModule} from 'primeng/toast';
import {MessageService} from 'primeng/api';
import {ProgressSpinnerModule} from 'primeng/progressspinner';
import {TabMenuModule} from 'primeng/tabmenu';
import {FileUploadModule} from 'primeng/fileupload';

import { AppComponent } from './app.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { AppRoutingModule } from './components/app-routing.module';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { PostComponent } from './components/post/post.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { AuthGuard } from './guards/auth.guard';
import { NotificationsService } from './services/notifications.service';
import { UserMainComponent } from './components/user-main/user-main.component';
import { UserInfoComponent } from './components/user-info/user-info.component';
import { UserFriendsComponent } from './components/user-friends/user-friends.component';
import { UserPicturesComponent } from './components/user-pictures/user-pictures.component';

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    RegisterComponent,
    LoginComponent,
    HomeComponent,
    PostComponent,
    UserProfileComponent,
    UserMainComponent,
    UserInfoComponent,
    UserFriendsComponent,
    UserPicturesComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    NgbModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    ToastModule
    ,ProgressSpinnerModule,
    TabMenuModule,
    FileUploadModule
  ],
  providers: [AuthGuard, NotificationsService, MessageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
