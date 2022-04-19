import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/User';
import { environment } from 'src/environments/environment';
import { ServiceService } from 'src/app/services/service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  username : string = "";
  password : string = "";
  email : string = "";
  firstname : string = "";
  lastname : string = "";
  location : string = "";
  users : Array<User> = [];

  constructor(private service : ServiceService, ) { }
  
  createUser(username: string, password: string, email: string, firstname: string, lastname: string, location: string){
    
    this.service.createUser(this.username, this.password, this.email, this.firstname, this.lastname, this.location).subscribe(responseBody => {
      this.username="";
      this.password="";
      this.email="";
      this.firstname="";
      this.lastname="";
      this.location="";
      this.users.push(responseBody);
    })

    console.log({
      "username": username,
      "password": password,
      "email": email,
      "firstname": firstname,
      "lastname": lastname,
      "location": location

    })
    this.router.navigate(['PublicPage']);
  }
  ngOnInit(): void {
  }

}
