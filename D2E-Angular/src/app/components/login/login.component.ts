import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/User';
import { ServiceService } from 'src/app/services/service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user: User = <User>{};
  constructor(private serviceService : ServiceService, private router : Router) { }

  username: string = "";
  password: string = "";

  ngOnInit(): void {
    this.logout();
  }

  login(){
    this.serviceService.login(this.username, this.password).subscribe(responseBody => {
      /* this.username = "";
      this.password = ""; */
      console.log(responseBody);
      this.user=responseBody;
    })
      this.router.navigate(['home']);
  }

  checkSession(){
    this.serviceService.checkSession().subscribe(responseBody => {
      console.log(responseBody);
    })
  }

  logout(){
    this.serviceService.logout().subscribe(responseBody => {
      console.log(responseBody);
    })
  }

}
