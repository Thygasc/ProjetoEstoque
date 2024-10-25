import { Component } from '@angular/core';

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
  constructor() {}
}
