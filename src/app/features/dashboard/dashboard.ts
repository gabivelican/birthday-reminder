import { Component, OnInit, signal, computed, inject } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { PersonModalComponent } from './person-modal/person-modal';
import { AuthService } from '../../core/services/auth.service';
import confetti from 'canvas-confetti';

export interface Friend {
  id: number;
  nume: string;
  prenume: string;
  dataNasterii: string;
  telefon: string;
  relatie: string;
}

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, NzTableModule, NzButtonModule, NzDividerModule, NzPopconfirmModule, NzInputModule, NzIconModule, PersonModalComponent],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss'
})
export class Dashboard implements OnInit {
  private authService = inject(AuthService);
  private router = inject(Router);

  friendsList = signal<Friend[]>([
    { id: 1, nume: 'Popescu', prenume: 'Ion', dataNasterii: '1995-12-05', telefon: '0722123456', relatie: 'Friend' },
    { id: 2, nume: 'Ionescu', prenume: 'Maria', dataNasterii: '1998-06-20', telefon: '0733123456', relatie: 'Family' },
    { id: 3, nume: 'Gheorghe', prenume: 'Vasile', dataNasterii: '2001-10-15', telefon: '0744123456', relatie: 'Colleague' }
  ]);

  searchTerm = signal('');

  isModalVisible = false;
  selectedFriend: Friend | null = null;

  filteredFriends = computed(() => {
    const term = this.searchTerm().toLowerCase();
    return this.friendsList().filter(f => 
      f.nume.toLowerCase().includes(term) || f.prenume.toLowerCase().includes(term)
    );
  });

  sortNume = (a: Friend, b: Friend) => a.nume.localeCompare(b.nume);
  sortPrenume = (a: Friend, b: Friend) => a.prenume.localeCompare(b.prenume);
  sortDataNasterii = (a: Friend, b: Friend) => new Date(a.dataNasterii).getTime() - new Date(b.dataNasterii).getTime();
  sortTelefon = (a: Friend, b: Friend) => a.telefon.localeCompare(b.telefon);
  sortRelatie = (a: Friend, b: Friend) => a.relatie.localeCompare(b.relatie);

  ngOnInit(): void {
    this.checkBirthdays();
  }

  onSearch(event: Event): void {
    const value = (event.target as HTMLInputElement).value;
    this.searchTerm.set(value);
  }

  openAddModal(): void {
    this.selectedFriend = null; 
    this.isModalVisible = true;
  }

  editFriend(friend: Friend): void {
    this.selectedFriend = friend; 
    this.isModalVisible = true;
  }

  closeModal(): void {
    this.isModalVisible = false;
  }

  handleSave(person: Friend): void {
    this.friendsList.update(list => {
      if (person.id) {
        return list.map(p => p.id === person.id ? person : p);
      } else {
        const newPerson = { ...person, id: Date.now() };
        return [newPerson, ...list];
      }
    });
    
    this.isModalVisible = false;
    
    const astazi = new Date();
    const dataNasterii = new Date(person.dataNasterii);
    
    if (
      dataNasterii.getMonth() === astazi.getMonth() && 
      dataNasterii.getDate() === astazi.getDate()
    ) {
      this.triggerConfetti();
    }
  }

  deleteFriend(id: number): void {
    this.friendsList.update(list => list.filter(p => p.id !== id));
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  checkBirthdays(): void {
    const today = new Date();
    const currentMonth = today.getMonth() + 1;
    const currentDay = today.getDate();

    const celebratingToday = this.friendsList().filter(f => {
      const birthDate = new Date(f.dataNasterii);
      return birthDate.getMonth() + 1 === currentMonth && birthDate.getDate() === currentDay;
    });

    if (celebratingToday.length > 0) {
      this.triggerConfetti();
    }
  }

  triggerConfetti(): void {
    const duration = 3500;
    const end = Date.now() + duration;
    const frame = () => {
      confetti({ particleCount: 5, angle: 60, spread: 55, origin: { x: 0 }, colors: ['#ff0000', '#00ff00', '#0000ff'] });
      confetti({ particleCount: 5, angle: 120, spread: 55, origin: { x: 1 }, colors: ['#ff0000', '#00ff00', '#0000ff'] });
      if (Date.now() < end) { requestAnimationFrame(frame); }
    };
    frame();
  }
}