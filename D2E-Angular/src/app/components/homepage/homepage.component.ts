import { Component, DoCheck, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Post } from 'src/app/models/Post';
import { User } from 'src/app/models/User';
import { ServiceService } from 'src/app/services/service.service';
import { ParentComponent } from '../post/parent/parent.component';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit, DoCheck {

  postList : Array<Post> = [];
  postInput : string = "";
  user : User = <User>{};
  post : Post = <Post>{};
  postMedia : string = "";
  file : File = <File>{};
  fileUrl : any;
  picExists : boolean = true;
  constructor(private service : ServiceService, private router : Router) { }

  ngOnInit(): void {
    this.checkSession();
    this.getAllPost();
    this.getUserByUserId();
  }

  ngDoCheck(): void {
    this.postList = this.postList;
  }

  getUserByUserId() {
    this.service.getUserbyUserId().subscribe(responseBody => {
      this.user = responseBody;
      console.log(responseBody);
    })
  }

  getAllPost() {
    this.service.getAllPost().subscribe(responseBody => {
      this.postList = responseBody;
      console.log(responseBody);
    })
  }

  createPost() {
    let formData: FormData = new FormData();
    formData.append('file', this.file);
    console.log(formData);
    this.service.upload(formData).subscribe(responseBody => {
  

    this.post.postMedia = responseBody;

    console.log(responseBody);
    
    
    
    this.service.checkSession().subscribe(userToPost => {
      this.user=userToPost;
      this.post.user=userToPost;
      this.post.postMedia="https://crs3bucket.s3.amazonaws.com/b384c649-f5ef-481c-84e3-f55464c0ddbd.jpg";
      
      console.log(this.post);
      
      this.service.createPost(this.post).subscribe(responseBody => {
        this.postInput="";
        this.post.user = userToPost;
        this.post.postBody = this.postInput;
        this.post.postMedia = "";
        this.postList.push(responseBody.data);
        
        console.log(this.post.postBody);
      })
    })
    })
  }
  addFile(e : any)
  {
      this.file = e.target.files[0];
      console.log(this.file);
      this.picExists = true;
      let reader = new FileReader();
      reader.readAsDataURL(e.target.files[0])
      reader.onload = (_e) =>
      {
        this.fileUrl = reader.result;
      }
      this.service.upload(e.target.files[0])
      console.log(e.target.files[0])
  }
  
  checkSession(){
    this.service.checkSession().subscribe(responseBody => {
      console.log(responseBody);
      if (responseBody == null){
        this.router.navigate(["../"])
      }
    })
  }
}