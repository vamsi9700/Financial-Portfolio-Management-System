import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'portfolio';
  isLogin:boolean=false;
  constructor(private router: Router){

  }
  ngOnInit(): void {
    debugger;
    let user:any;
    // user=localStorage.getItem("user");
    this.isLogin = !this.router.url.includes('login');
    if(user){
      this.isLogin=true;
    }else{
      this.isLogin=false;
    }
  }
}
