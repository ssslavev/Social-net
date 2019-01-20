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

  isLoggedIn$;
  user$;

  constructor(private router: Router,
    private authService: AuthService) { }

  ngOnInit() {

    this.user$ = localStorage.getItem('logged-user-name');
    this.isLoggedIn$ = localStorage.getItem('logged-user-id');
  }

  logOut() {
    localStorage.clear();
    this.router.navigate(['/']);
    location.reload();


  }


}
