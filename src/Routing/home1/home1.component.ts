import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-home1',
  standalone: true,
  imports: [RouterModule,FormsModule],
  templateUrl: './home1.component.html',
  styleUrl: './home1.component.css'
})
export class Home1Component {
  
  constructor(private router : Router) {}

  loadchild() {
    this.router.navigate(['Home', 'Children'])
  }

}
