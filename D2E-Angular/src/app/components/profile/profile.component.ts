import { Component, OnInit } from '@angular/core';
import { Post } from 'src/app/models/Post';
import { ServiceService } from 'src/app/services/service.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  postList : Array<Post> = [];
  post : Post = <Post>{};
  comments : Comment = <Comment>{};

  constructor(private service : ServiceService) { }

  ngOnInit(): void {
    this.getAllPostGivenUserId();
  }

  getAllPostGivenUserId() {
    this.service.getAllPostByUserId().subscribe(responseBody => {
      this.postList = responseBody;
      console.log(this.postList);
    })
  }
}
