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

}
