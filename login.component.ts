import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { SuccessDialogComponent } from '../success-dialog/success-dialog.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule,CommonModule,ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  loginSuccess: boolean = false;
  showPassword: boolean = false;
  showEyeIcon: boolean = false;

  LoginForm = new FormGroup({
    Email: new FormControl('', [
      Validators.required,
      Validators.pattern("^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$")
    ]),
    Password: new FormControl('', [
      Validators.required,
      Validators.maxLength(10)
    ])
  });

  constructor(private router: Router,private dialog:MatDialog) {}



  logIn(): void {
    if (this.LoginForm.valid) {
      const formValues = this.LoginForm.value;
      if (formValues.Email === 'gauri@gmail.com' && formValues.Password === '1111') {
        this.loginSuccess = true;
        this.openSuccessDialog();
        // alert('Login successfully.');
        this.router.navigate(['json']);
      } else {
        this.loginSuccess = false;
        alert('Please enter valid data.');
      }
    } else {
      this.loginSuccess = false;
      alert('Please enter valid data.');
    }

    this.LoginForm.reset();
  }

  openSuccessDialog() {
    this.dialog.open(SuccessDialogComponent);
  }



  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  onPasswordInput() {
    const passwordValue = this.LoginForm.controls['Password'].value;
    if (passwordValue !== null) {
      this.showEyeIcon = passwordValue.length > 0;
    } else {
      this.showEyeIcon = false;
    }
  }
}

