import { Component, OnInit } from '@angular/core';
import { Post } from 'src/app/models/Post';
import { ServiceService } from 'src/app/services/service.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {

  postList : Array<Post> = [];
  postInput : string = "";

  constructor(private service : ServiceService) { }

  ngOnInit(): void {
    this.getAllPost();
  }

  getAllPost() {
    this.service.getAllPost().subscribe(responseBody => {
      this.postList = responseBody;
      console.log(responseBody);
    })
  }

  createPost(e : any) {
    e.preventDefault();

    this.service.createPost(this.postInput).subscribe(responseBody => {
      this.postInput="";
      this.postList.push(responseBody.data);
      console.log(responseBody.data);
    })
  }

}
