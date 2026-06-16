import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div style="padding: 20px;">
      <h1>Dashboard - Aniversări</h1>
      <p>Aici va fi tabelul tău cu aniversări.</p>
    </div>
  `
})
export class Dashboard {}