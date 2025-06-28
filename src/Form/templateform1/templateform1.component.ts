import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, NgForm, NgModel } from '@angular/forms';
import { Router } from '@angular/router';
import moment from 'moment';

interface Tasksts {
  email: string;
  taskname: string;
  assto: string;
  selectedStatus: string;
  duedate: any;
}

@Component({
  selector: 'app-templateform1',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './templateform1.component.html',
  styleUrl: './templateform1.component.css',
})
export class Templateform1Component implements OnInit {
  status = {
    email: '',
    taskname: '',
    assto: '',
    selectedStatus: '',
    duedate: new Date().toISOString().split('T')[0]
  };

  // today = moment();
  // duedate = this.today;

  ngOnInit(): void {
    // console.log(this.duedate);
  }

  // duedate = new Date().toISOString().split('T')[0];

  sts = ['Pending', 'Inprocess', 'Finish'];

  showErrors = false;

  constructor(private router: Router) {}

  OnSubmit() {
    if (this.status.email && this.status.taskname) {
      this.showErrors = false;
      console.log('Form submitted with email:', this.status);
    }
    this.showErrors = true;
    return;
  }

  reset() {
    this.status = {
      email: '',
      taskname: '',
      assto: '',
      selectedStatus: '',
       duedate: new Date().toISOString().split('T')[0]
    };
  }

  backbutton() {
    this.router.navigate(['/signal']);
  }
}
