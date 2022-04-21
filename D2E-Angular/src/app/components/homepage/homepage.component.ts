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

  createPost(e : any) {
    e.preventDefault();

    this.service.getUserbyUserId().subscribe(userToPost => {
      this.user=userToPost;
      this.post.user=userToPost;
      console.log(this.post);

      this.service.createPost(this.post).subscribe(responseBody => {
        this.postInput="";
        this.post.user = userToPost;
        this.post.postBody = this.postInput;
        this.postList.push(responseBody.data);
        
        console.log(this.post.postBody);
      })
    })
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