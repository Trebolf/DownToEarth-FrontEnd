import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor() { }

  createUser(username: string, password: string) {
    return this.httpCli.post<any>("http://localhost:9000/register",{
      "username": username,
      ""
    }
  }
  ngOnInit(): void {
  }

}
