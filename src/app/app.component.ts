import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {

  subMenuOpen = false;

  alterarSubMenu(){
    this.subMenuOpen = !this.subMenuOpen;

}
  constructor(private router:Router) {}
  
  GoHome(){
    this.router.navigate(['/home']);
  }

}
