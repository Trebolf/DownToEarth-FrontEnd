import { Component } from '@angular/core';
import { User } from './models/User';
import { ServiceService } from './services/service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'D2E-Angular';

  user : User = <User>{};

  searchBox : boolean = false;
  searchBoxVisibility : boolean = false;

  constructor(private service : ServiceService) { }

  logout() {
    this.service.logout().subscribe(responseBody => {
      console.log(responseBody);
    })
  }

  redirectToProfile() {

  }

  setButton() {
    this.searchBox = this.searchBoxVisibility;
  }

  toggleSearch() {
    if (this.searchBoxVisibility == true) {
      this.searchBoxVisibility = false;
    } else {
      this.searchBoxVisibility = true;
    }

    this.setButton();
  }
}

