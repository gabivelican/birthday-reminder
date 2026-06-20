import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { Friend } from '../dashboard'; 

@Component({
  selector: 'app-person-modal',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, NzModalModule, NzFormModule, NzInputModule, NzSelectModule],
  templateUrl: './person-modal.html',
  styleUrl: './person-modal.scss'
})
export class PersonModalComponent implements OnChanges {
  private fb = inject(FormBuilder);

  @Input() isVisible: boolean = false;
  @Input() personToEdit: Friend | null = null;
  
  @Output() closeModal = new EventEmitter<void>();
  @Output() savePerson = new EventEmitter<Friend>();

  personForm: FormGroup = this.fb.group({
    id: [null],
    nume: ['', Validators.required],
    prenume: ['', Validators.required],
    dataNasterii: ['', Validators.required],
    telefon: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
    relatie: ['Friend', Validators.required]
  });

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['personToEdit']) {
      if (this.personToEdit) {
        this.personForm.patchValue(this.personToEdit);
      } else {
        this.personForm.reset({ relatie: 'Friend' }); 
      }
    }
  }

  handleOk(): void {
    if (this.personForm.valid) {
      this.savePerson.emit(this.personForm.value);
    } else {
      Object.values(this.personForm.controls).forEach(control => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }

  handleCancel(): void {
    this.closeModal.emit();
  }
}