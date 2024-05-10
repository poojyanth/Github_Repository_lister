import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {

  userName: string = '';

  @Output() userNameSearch = new EventEmitter<string>();

  searchUser() {
    this.userNameSearch.emit(this.userName);
  }
}
