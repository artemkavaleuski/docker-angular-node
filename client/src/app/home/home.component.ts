import { Component, OnInit } from '@angular/core';
import { DummyService } from '../services/dummy.service';
import { Subscription } from 'rxjs';
import { AuthenticationService } from '../services/auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  text: string;
  sub: Subscription;

  constructor(
    private dummyService: DummyService,
    private authService: AuthenticationService,
    private router: Router
    ) {}

  logout() {
    this.authService.logout();
    this.router.navigateByUrl('login');
  }

  ngOnInit() {
    this.sub = this.dummyService.getText().subscribe(data => {
      this.text = data.dummy.text;
    });
  }
}
