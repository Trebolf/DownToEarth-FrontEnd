import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  register-form: FormGroup;


  constructor(
    private Form
  ) { }

  ngOnInit(): void {
  }

}
