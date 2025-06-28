import { CommonModule } from '@angular/common';
import {
  Component,
  computed,
  effect,
  OnInit,
  signal,
  WritableSignal,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ServiceService } from '../../Service/service.service';
import { Router } from '@angular/router';

interface Todo {
  title: string;
  bool: boolean;
}

@Component({
  selector: 'app-binding-component',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './binding-component.component.html',
  styleUrl: './binding-component.component.css',
})
export class BindingComponentComponent implements OnInit {
  isbtndisable = true;

  todos: WritableSignal<Todo[]>;

  username = signal('');

  name: string = '';

  Name2: string = 'Angular Oneway Binding';

  Signal: string = 'Signal - click for checking';

  valu = signal('Angular Signal');

  constructor(private serv: ServiceService, private router : Router) {
    this.todos = signal([{ title: this.Signal, bool: false }]);

    effect(() => {
      console.log(this.message());
    });
  }

  chktheabvbtn(): void {
    this.isbtndisable = !this.isbtndisable;
  }

  Users = [
    { fname: 'Muthu', lname: 'R', Handle: '@abi' },
    { fname: 'Prabhu', lname: 'R', Handle: '@abi' },
    { fname: 'Abishek', lname: 'R', Handle: '@abi' },
  ];

  getUserProfile(): Promise<{ name: string; age: number }> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ name: 'Alice', age: 25 });
      }, 5000);
    });
  }

  ngOnInit(): void {
    this.getUserProfile().then((profile) => {
      console.log(`Name: ${profile.name}, Age: ${profile.age}`);
    });

    this.serv.getUserProfile().then((profile) => {
      console.log(`Name: ${profile.name}, Age: ${profile.age}`);
    });
  }

  names = ['Alice', 'Bob', 'Charlie'];
  greetings: string[] = [];

  greetPeople() {
    this.greetings = [];

    for (const name of this.names) {
      this.greetings.push(`Hello, ${name}!`);
    }
  }

  increasevalue = signal(0);

  calculation = computed(() => this.increasevalue() * 2);

  increase() {
    this.increasevalue.set(this.increasevalue() + 1);
  }

  decrease() {
    this.increasevalue.update((num) => num - 1);
  }

  users = [
    { name: 'Alice', email: 'alice@example.com', isActive: true },
    { name: 'Bob', email: 'bob@example.com', isActive: false },
    { name: 'Charlie', email: 'charlie@example.com', isActive: true },
  ];

  userRole: string = 'admin';

  checkRole(): string {
    if (this.userRole === 'admin') {
      return 'Administrator privileges';
    } else if (this.userRole === 'editor') {
      return 'Editor privileges';
    } else {
      return 'Guest privileges';
    }
  }

  getAccessLevel(): string {
    switch (this.userRole) {
      case 'admin':
        return 'Full access';
      case 'editor':
        return 'Limited access';
      default:
        return 'No access';
    }
  }

  updatetodo(index: number) {
    this.todos.update((value) => {
      value[index].bool = !value[index].bool;
      console.log(value[index].bool);
      console.log(index);
      return value;
    });
  }

  changesignal() {
    this.valu.update((name) => 'Angular Signal Updated');
  }

  readonly name2 = signal('World');

  readonly message = computed(() => {
    return `Hello ${this.name2()}!`;
  });

  backbutton() {
    this.router.navigate(['/Home'])
  }


  // firstName = signal('John');
  // lastName = signal('Doe');

  // fullName = computed(() => `${this.firstName()} ${this.lastName()}`);
}
