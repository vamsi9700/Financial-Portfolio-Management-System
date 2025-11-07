import { Component } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MaterialModule } from '../material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { SharedDataService } from '../service/shared-data.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  imports: [MaterialModule, FormsModule, ReactiveFormsModule, FlexLayoutModule,CommonModule],
  standalone: true
})
export class LoginComponent {
  constructor(private fb: FormBuilder, private router: Router,
    private shared: SharedDataService
  ) { }
  loginForm = this.fb.group({
    username: ['', Validators.required],
    password: ['', Validators.required]
  });
  onLogin() {
    debugger;
    const { username, password } = this.loginForm.value;
    if (username === 'admin' && password === '12345') {
      localStorage.setItem('user', username);
      this.router.navigate(['/dashboard']);
      let isLogin: boolean = true;
      this.shared.sendData(isLogin);
    } else {
      alert('Invalid credentials! Try admin / 12345');
    }
  }
}
