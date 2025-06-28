import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-homechild',
  standalone: true,
  imports: [FormsModule, RouterModule],
  templateUrl: './homechild.component.html',
  styleUrl: './homechild.component.css'
})
export class HomechildComponent {

  constructor(private router: Router) {}

  loadgrandchildren() {
    this.router.navigate(['Home', 'Children', 'GrandChildren'])
  }
}
