import { Component, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../core/services/auth/auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent {
  msgError: string = '';
  successMsg: string = '';
  private readonly router = inject(Router);
  private readonly authService = inject(AuthService);
  isLoading: boolean = false;
  registerForm: FormGroup = new FormGroup({
    name: new FormControl(null, [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(20),
    ]),
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [
      Validators.required,
      Validators.pattern(/^[A-Z]\w{6,}$/),
    ]),
    age: new FormControl(null, [
      Validators.required,
      Validators.pattern(/^(1[0-9]|[2-7][0-9]|80)$/),
    ]),
    phone: new FormControl(null, [
      Validators.required,
      Validators.pattern(/^01[0125][0-9]{8}$/),
    ]),
  });
  SubmitForm(): void {
    console.log(this.registerForm.value);
    if (this.registerForm.valid) {
      this.isLoading = true;
      this.authService.sendRegisterData(this.registerForm.value).subscribe({
        next: (res) => {
          if (res.msg === 'done') {
            console.log(res);
            this.registerForm.reset();
            setTimeout(() => {
              this.router.navigate(['/login']);
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
      this.registerForm.markAllAsTouched();
    }
  }
}
