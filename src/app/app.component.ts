import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SharedDataService } from './service/shared-data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'portfolio';
  isLogin: boolean = false;
  constructor(private router: Router, private route: ActivatedRoute,
    private shared: SharedDataService
  ) {
    this.shared.data$.subscribe(val => {
      debugger;
      this.isLogin = val;
    });
  }
  ngOnInit(): void {
    debugger;
    if (window.location.pathname == "/") {
      this.isLogin = false;
    } else {
      this.isLogin = true;
    }
    let isLogin: any = this.isLogin;
    localStorage.setItem("isLogin", isLogin);
  }
}
