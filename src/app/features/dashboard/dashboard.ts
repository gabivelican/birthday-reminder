import { Component, OnInit, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzIconModule } from 'ng-zorro-antd/icon';
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
  imports: [CommonModule, NzTableModule, NzButtonModule, NzDividerModule, NzPopconfirmModule, NzInputModule, NzIconModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss'
})
export class Dashboard implements OnInit {
  friendsList = signal<Friend[]>([
    { id: 1, nume: 'Popescu', prenume: 'Ion', dataNasterii: '1995-12-05', telefon: '0722123456', relatie: 'Friend' },
    { id: 2, nume: 'Ionescu', prenume: 'Maria', dataNasterii: '1998-06-20', telefon: '0733123456', relatie: 'Family' },
    { id: 3, nume: 'Gheorghe', prenume: 'Vasile', dataNasterii: '2001-10-15', telefon: '0744123456', relatie: 'Colleague' }
  ]);

  searchTerm = signal('');

  filteredFriends = computed(() => {
    const term = this.searchTerm().toLowerCase();
    return this.friendsList().filter(f => 
      f.nume.toLowerCase().includes(term) || f.prenume.toLowerCase().includes(term)
    );
  });

  sortNume = (a: Friend, b: Friend) => a.nume.localeCompare(b.nume);
  sortPrenume = (a: Friend, b: Friend) => a.prenume.localeCompare(b.prenume);

  ngOnInit(): void {
    this.checkBirthdays();
  }

  onSearch(event: Event): void {
    const value = (event.target as HTMLInputElement).value;
    this.searchTerm.set(value);
  }

  editFriend(friend: Friend): void {
    console.log('Editing:', friend);
  }

  deleteFriend(id: number): void {
    this.friendsList.update(list => list.filter(p => p.id !== id));
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