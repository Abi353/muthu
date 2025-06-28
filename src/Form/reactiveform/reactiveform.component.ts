import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-reactiveform',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterLink],
  templateUrl: './reactiveform.component.html',
  styleUrl: './reactiveform.component.css',
})
export class ReactiveformComponent implements OnInit {
  form!: FormGroup;
  declarename = '/templateform1';

  // form = new FormGroup ({
  //   fulnam: new FormControl('',Validators.required),
  //     usrnam: new FormControl('',Validators.required),
  //     email: new FormControl('',[Validators.required, Validators.email]),
  //     paswrd: new FormControl('',Validators.required),
  //     confipaswrd: new FormControl('',Validators.required)
  // })

  showErrors = false;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.form = this.fb.group(
      {
        fulnam: ['', Validators.required],
        usrnam: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        paswrd: ['', Validators.required],
        confipaswrd: ['', Validators.required],
      },
      { validators: this.passwordMatchValidator }
    );
  }

  OnSubmit() : void {

    const invaid = Object.keys(this.form.controls).find((key) => {
      return this.form.controls[key].status !== "INVALID";
    });
    console.log(this.form.controls);

    this.showErrors = true;
  if (this.form.invalid && !this.form.errors?.['passwordMatchValidator']) {
    console.log('Form is invalid');
    return;
  }
  console.log('Form submitted!', this.form.value);
  this.form.reset();
  this.showErrors = false;
  }

  clear() {
    // this.form = this.fb.group({
    //     fulnam: '',
    //     usrnam: '',
    //     email: '',
    //     paswrd: '',
    //     confipaswrd: ''
    // })

    this.form.reset();
  this.showErrors = false;
  }

  passwordMatchValidator(control: AbstractControl): { [key: string]: boolean } | null {
    const password = control.get('paswrd')?.value;
    const confirm = control.get('confipaswrd')?.value;
    return password === confirm ? null : { passwordMismatch: true };
  }
}
