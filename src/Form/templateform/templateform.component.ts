import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-templateform',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './templateform.component.html',
  styleUrl: './templateform.component.css',
})
export class TemplateformComponent {
  gender = ['male', 'female'];
  degereee = ['Bachlors', 'Engineer', 'Doctorate', 'Diploma'];

  userdata = {
    firstname: '',
    lastname: '',
    degeree: '',
    passwords: {
      password: '',
      confirmpassword: '',
    },
  };

  constructor(private router: Router) {}

  passwordsMatch(): boolean {
    const pw = this.userdata.passwords.password;
    const cpw = this.userdata.passwords.confirmpassword;
    return pw === cpw;
  }

  OnSubmit(form: NgForm) {
    
    if (form.invalid) {
    Object.values(form.controls).forEach(control => {
      control.markAsTouched();
    });
    return;
  }
  if (form.invalid || !this.passwordsMatch()) {
      alert("Not Matched");
    return;
  }

  const password = form.value.password;
  if (password.length < 6) {
    alert('Password must be at least 6 characters long.');
    return;
  }
  console.log('Form submitted:', form.value);

  form.resetForm();
  }

  reset(form : NgForm): void {
    console.log('ss', form);
    form.reset();
  }

  backbutton() {
    this.router.navigate(['/signal']);
  }
}
