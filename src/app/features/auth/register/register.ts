import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { passwordValidator } from '../../../core/validators/password.validator';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, NzFormModule, NzInputModule, NzButtonModule, NzIconModule, RouterLink],
  templateUrl: './register.html',
  styleUrl: './register.scss'
})
export class Register {
  registerForm: FormGroup;
  passwordVisible = false;
  confirmPasswordVisible = false;
  
  private authService = inject(AuthService);
  private router = inject(Router);

  constructor(private fb: FormBuilder) {
    this.registerForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      password: ['', [Validators.required, passwordValidator()]],
      confirmPassword: ['', [Validators.required]]
    }, { validators: this.passwordMatchValidator });
  }

  passwordMatchValidator(g: FormGroup) {
    return g.get('password')?.value === g.get('confirmPassword')?.value ? null : { mismatch: true };
  }

  submit() {
    if (this.registerForm.valid) {
      const { email, password } = this.registerForm.value;
      
      this.authService.register({ email, password }).subscribe({
        next: (res) => {
          localStorage.setItem('token', res.token || 'fake-token');
          this.router.navigate(['/dashboard']);
        },
        error: (err) => {
          console.error('Registration error:', err);
          localStorage.setItem('token', 'fake-token-pentru-demo');
          this.router.navigate(['/dashboard']);
        }
      });
    } else {
      this.registerForm.markAllAsTouched();
    }
  }
}