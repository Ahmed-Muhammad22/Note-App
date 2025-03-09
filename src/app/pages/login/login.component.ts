import { Component, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth/auth.service';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  msgError: string = '';
  successMsg: string = '';
  private readonly router = inject(Router);
  private readonly authService = inject(AuthService);

  isLoading: boolean = false;
  loginForm: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [
      Validators.required,
      Validators.pattern(/^[A-Z]\w{6,}$/),
    ]),
  });
  SubmitForm(): void {
    console.log(this.loginForm.value);
    if (this.loginForm.valid) {
      this.isLoading = true;
      this.authService.sendLoginData(this.loginForm.value).subscribe({
        next: (res) => {
          if (res.msg === 'done') {
            console.log(res);
            localStorage.setItem('token', res.token);
            this.authService.saveUserToken();
            this.loginForm.reset();

            setTimeout(() => {
              this.router.navigate(['/home']);
            }, 500);
          }
          this.isLoading = false;
          this.successMsg = res.msg;
        },
        error: (err) => {
          this.isLoading = false;
          this.msgError = err.error.msg;
        },
      });
    } else {
      this.loginForm.markAllAsTouched();
    }
  }
}
