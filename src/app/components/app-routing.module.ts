import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { UserProfileComponent } from './user-profile/user-profile.component';

import { UserMainComponent } from './user-main/user-main.component';
import { UserInfoComponent } from './user-info/user-info.component';
import { UserFriendsComponent } from './user-friends/user-friends.component';
import { UserPicturesComponent } from './user-pictures/user-pictures.component';
import { AuthGuard } from '../core/guards/auth.guard';

const routes: Routes = [
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  {
    path: 'users/:id', component: UserProfileComponent,
    children: [
      { path: 'main', component: UserMainComponent },
      { path: 'information', component: UserInfoComponent },
      { path: 'friends', component: UserFriendsComponent },
      { path: 'pictures', component: UserPicturesComponent },
      { path: '', redirectTo: 'main', pathMatch: 'full' }
    ]
  },
  { path: '', redirectTo: '/home', pathMatch: 'full' }
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
