import { Component, OnInit } from '@angular/core';
import { Post } from 'src/app/models/Post';
import { User } from 'src/app/models/User';
import { ServiceService } from 'src/app/services/service.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {

  postList : Array<Post> = [];
  postInput : string = "";
  user : User = <User>{};
  post : Post = <Post>{};
  

  constructor(private service : ServiceService) { }

  ngOnInit(): void {
    this.getAllPost();
    this.getUserByUserId();
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

    let userToPost = this.user;

    this.service.getUserbyUserId().subscribe(userToPost => {
      this.user=userToPost;
      console.log(userToPost);
    })

    this.service.createPost(this.postInput).subscribe(responseBody => {
      this.postInput="";
      this.post.user = userToPost;
      this.post.postBody = this.postInput;
      this.postList.push(responseBody.data);
      
      console.log(userToPost);

      /* console.log(this.postInput);
      console.log(this.post);
      console.log(userToPost);
      console.log(responseBody.data); */
    })
  }

}
