import { Component, OnInit, OnChanges, Input } from '@angular/core';
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
  user$: Observable<string>;

  constructor(private router: Router,
    private authService: AuthService) { }

  ngOnInit() {

    this.user$ = this.authService.loggedUser;
    this.isLoggedIn$ = this.authService.isLoggedIn;
  }

  logOut() {
    localStorage.clear();
    this.router.navigate(['/']);
    location.reload();


  }


}
