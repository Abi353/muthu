import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-home-grand-children',
  standalone: true,
  imports: [],
  templateUrl: './home-grand-children.component.html',
  styleUrl: './home-grand-children.component.css'
})
export class HomeGrandChildrenComponent {
  constructor (private router : Router,
    private toastr : ToastrService
  ) {}

  backtoparent() {
    this.router.navigate(['/Home']);
    this.toastr.success('everything is clear', 'Parent Component', {
  timeOut: 3000,
});
  }
}
