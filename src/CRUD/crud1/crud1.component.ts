import { CommonModule } from '@angular/common';
import { Component, computed, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

interface StudentResult {
  name: string;
  english: number | null;
  maths: number | null;
  cs: number | null;
  total: number;
}

@Component({
  selector: 'app-crud1',
  standalone: true,
  imports: [RouterLink,FormsModule,CommonModule],
  templateUrl: './crud1.component.html',
  styleUrl: './crud1.component.css'
})
export class Crud1Component {
  fulnam = signal('');
  eng = signal<number | null>(null);
  mat = signal<number | null>(null);
  cs = signal<number | null>(null);

  engInput = signal('');
  matInput = signal('');
  csInput = signal('');

  tot = computed (() => (this.eng() || 0) + (this.mat() || 0) + (this.cs() || 0));

  results = signal<StudentResult[]>([]);

  onMarksInput(field: 'eng' | 'mat' | 'cs', event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    const value = inputElement.value.replace(/[^0-9]/g, ''); // Filter non-digits
    const numValue = value === '' ? null : parseInt(value, 10);

    // Update the corresponding signal
    if (field === 'eng') {
      this.eng.set(numValue);
      this.engInput.set(value); // Keep the input field in sync with filtered value
    } else if (field === 'mat') {
      this.mat.set(numValue);
      this.matInput.set(value);
    } else if (field === 'cs') {
      this.cs.set(numValue);
      this.csInput.set(value);
    }
  }

  addStudentResult(): void {

    if(!this.fulnam() || this.eng() === null || this.mat() === null  || this.cs() === null) {
      alert("Not Accepted");
    }
    else{
const newResult: StudentResult = {
      name: this.fulnam(),
      english: this.eng(),
      maths: this.mat(),
      cs: this.cs(),
      total: this.tot(),
    };
    this.results.update((currentResults) => [...currentResults, newResult]);

    // Optional: Clear the input fields after adding
    this.fulnam.set('');
    this.eng.set(null);
    this.mat.set(null);
    this.cs.set(null);
    this.engInput.set('');
    this.matInput.set('');
    this.csInput.set('');
    }
    
    
    
  }
}
