import { Component } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MaterialModule } from '../material.module';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  imports:[MaterialModule,FormsModule,ReactiveFormsModule],
  standalone:true
})
export class LoginComponent {
constructor(private fb: FormBuilder, private router: Router) {}

  loginForm = this.fb.group({
    username: ['', Validators.required],
    password: ['', Validators.required]
  });

  onLogin() {
    debugger;
    const { username, password } = this.loginForm.value;
    // Simple mock validation (replace with real auth later)
    if (username === 'admin' && password === '12345') {
      localStorage.setItem('user', username);
      this.router.navigate(['/dashboard']);
      // localStorage.removeItem("user");
    } else {
      alert('Invalid credentials! Try admin / 12345');
    }
  }
}
