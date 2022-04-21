import { Component } from '@angular/core';
import { ServiceService } from './services/service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'D2E-Angular';

  constructor(private service : ServiceService) { }

  logout() {
    this.service.logout().subscribe(responseBody => {
      console.log(responseBody);
    })
  }
}

