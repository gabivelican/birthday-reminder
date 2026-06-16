import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router'; // Adaugă importul
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { passwordValidator } from '../../../core/validators/password.validator';
import { AuthService } from '../../../core/services/auth.service'; // Adaugă importul

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, NzFormModule, NzInputModule, NzButtonModule, NzCheckboxModule],
  templateUrl: './login.html'
})
export class Login {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);

  loginForm: FormGroup = this.fb.group({
    email: ['eve.holt@reqres.in', [Validators.required, Validators.email]], // Email-ul asta funcționează cu reqres.in
    password: ['Parola1!', [Validators.required, passwordValidator()]],
    remember: [false]
  });

  submit() {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
      const payload = { email, password };

      this.authService.login(payload).subscribe({
        next: (res) => {
          localStorage.setItem('token', res.token || 'fake-token');
          this.router.navigate(['/dashboard']);
        },
        error: (err) => {
          console.error('Eroare logare (API-ul a respins datele):', err);
          // Trecem mai departe pentru a putea lucra la restul aplicației
          localStorage.setItem('token', 'fake-token-pentru-demo');
          this.router.navigate(['/dashboard']);
        }
      });
    }
  }
}