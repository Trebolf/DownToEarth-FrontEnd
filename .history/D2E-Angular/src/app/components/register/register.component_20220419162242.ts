import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

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

  constructor(private httpCli : HttpClient) { }
  
  createUser(username: string, password: string, email: string, firstname: string, lastname: string, location: string){
    
    this.createUser(this.)

    console.log({
      "username": username,
      "password": password,
      "email": email,
      "firstname": firstname,
      "lastname": lastname,
      "location": location

    })
    return this.httpCli.post<any>(`${environment.domain}/user`,{
      "username": username,
      "password": password,
      "email": email,
      "firstname": firstname,
      "lastname": lastname,
      "location": location

    },{
      withCredentials: true
    })
  }
 
  ngOnInit(): void {
  }

}
