import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router'; // Am adăugat RouterLink aici
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { passwordValidator } from '../../../core/validators/password.validator';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ReactiveFormsModule, 
    NzFormModule, 
    NzInputModule, 
    NzButtonModule, 
    NzCheckboxModule, 
    RouterLink,
  ],
  templateUrl: './login.html',
  styleUrl: './login.scss'
})
export class Login {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);

  loginForm: FormGroup = this.fb.group({
    email: ['eve.holt@reqres.in', [Validators.required, Validators.email]],
    password: ['Parola1!', [Validators.required, passwordValidator()]],
    remember: [false]
  });

  submit() {
    if (this.loginForm.valid) {
      const { email, password, remember } = this.loginForm.value;
      const payload = { email, password };

      this.authService.login(payload).subscribe({
        next: (res) => {
          this.handleToken(res.token, remember);
          this.router.navigate(['/dashboard']);
        },
        error: (err) => {
          console.error('Eroare logare (API-ul a respins datele):', err);
          this.handleToken('fake-token-pentru-demo', remember);
          this.router.navigate(['/dashboard']);
        }
      });
    }
  }

  private handleToken(token: string, remember: boolean): void {
    if (remember) {
      localStorage.setItem('token', token);
    } else {
      sessionStorage.setItem('token', token);
    }
  }
}