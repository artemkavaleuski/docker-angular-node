import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { environment } from './../environments/environment';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'client';
  text: string;
  sub: Subscription;
  constructor(private http: HttpClient) {
  }

  ngOnInit() {
     this.sub = this.http
      .get(environment.api)
      .subscribe((data: any) => {
        this.text = data.text
      })
  }

  ngOnDestroy() {
    if(this.sub) {
      this.sub.unsubscribe()
    }
  }
}
