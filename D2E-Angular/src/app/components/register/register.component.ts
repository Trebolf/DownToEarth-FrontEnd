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
  profilePic : string = "";
  users : Array<User> = [];

  file : File = <File>{};
  fileUrl : any;
  picture : boolean = false;
  constructor(private service : ServiceService, private router : Router) { }
  
  createUser(username: string, password: string, email: string, firstname: string, lastname: string, location: string, profilePic: string){
    
    this.service.createUser(this.username, this.password, this.email, this.firstname, this.lastname, this.location, "https://crs3bucket.s3.amazonaws.com/b384c649-f5ef-481c-84e3-f55464c0ddbd.jpg").subscribe(responseBody => {
      this.username="";
      this.password="";
      this.email="";
      this.firstname="";
      this.lastname="";
      this.location="";
      this.profilePic="";
      this.users.push(responseBody);
    })

    console.log({
      "username": username,
      "password": password,
      "email": email,
      "firstname": firstname,
      "lastname": lastname,
      "location": location,
      "profilePic": profilePic
    })
    this.router.navigate(['home']);
  }
  ngOnInit(): void {
  }
  addFile(e : any)
  {
      this.file = e.target.files[0];
      this.picture = true;
      let reader = new FileReader();
      reader.readAsDataURL(e.target.files[0])
      reader.onload = (_e) =>
      {
        this.fileUrl = reader.result;
      }
  }
}
