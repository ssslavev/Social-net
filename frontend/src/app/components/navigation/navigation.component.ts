import { Component, OnInit, OnChanges } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {

  isLoggedIn$: Observable<boolean>;

  isLogged: boolean;
  username: string;

  constructor(private router: Router,
    private authService: AuthService) { }

  ngOnInit() {
    if (localStorage.getItem('token')) {
      this.username = localStorage.getItem('logged-user-name');
      
    }

    this.isLoggedIn$ = this.authService.isLoggedIn;
    
  }


    logOut() {
      localStorage.clear();
      this.isLogged = false;
      this.router.navigate(['/']);
      location.reload();


    }


  }
