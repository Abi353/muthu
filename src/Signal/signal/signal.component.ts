import { CommonModule } from '@angular/common';
import { Component, computed, signal } from '@angular/core';
import { Router } from '@angular/router';

interface Student {
  name : string;
  math : number;
  science : number;
  english : number;
  extra : number;
} 

@Component({
  selector: 'app-signal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './signal.component.html',
  styleUrl: './signal.component.css'
})
export class SignalComponent {
    extra : boolean = true;
  constructor (private router : Router) {}
students = signal([
    { name: 'Alice', math: 85, science: 90, english: 88 },
    { name: 'Bob', math: 78, science: 82, english: 80 },
    { name: 'Charlie', math: 92, science: 88, english: 91, extra: 10 },
    { name: 'Muthu', math: 76, science: 94, english: 66 },
  ]);

  studentss = signal<Student[]>([
    { name: 'Alice', math: 85, science: 90, english: 88, extra: 0 },
    { name: 'Bob', math: 78, science: 82, english: 80, extra: 0 },
    { name: 'Charlie', math: 92, science: 88, english: 91, extra: 10 },
    { name: 'Muthu', math: 76, science: 94, english: 66, extra : 0 }
  ]);

  headers = computed(() => ['Name', 'Math', 'Science', 'English', 'Total']);

  studentWithTotal = computed(() =>
    this.students().map((s) => ({
      ...s,
      total: s.math + s.science + s.english + 
      (s.extra !== undefined && s.extra !== null ? s.extra : 0),
    }))
  );

  counter = signal(0);

  increment() {
    this.counter.set(this.counter() + 1);
  }

  decrement() {
    this.counter.update((num) => num - 1);
  }

  spancolor = computed (() => (this.counter() > 2 ? 'black' : 'SlateBlue' ));

  backbutton() {
    this.router.navigate(['/binding'])
  }
}
