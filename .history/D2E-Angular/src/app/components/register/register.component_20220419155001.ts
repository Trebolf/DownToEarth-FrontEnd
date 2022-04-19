import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private httpCli : HttpClient) { }

  createUser(username: string, password: string){
    return this.httpCli.post<any>(`${environment.domain}/user`,{
      "username": username,
      "password": password,
      
    },{
      withCredentials: true
    })
  }
 
  ngOnInit(): void {
  }

}
