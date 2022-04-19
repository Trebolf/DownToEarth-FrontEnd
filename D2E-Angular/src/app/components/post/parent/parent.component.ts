import { Component, OnInit } from '@angular/core';
import { Post } from 'src/app/models/Post';
import { ServiceService } from 'src/app/services/service.service';

@Component({
  selector: 'app-parent',
  templateUrl: './parent.component.html',
  styleUrls: ['./parent.component.css']
})
export class ParentComponent implements OnInit {

  postList : Array<Post> = [];
  post : Post = <Post>{};
  comments : Comment = <Comment>{};

  constructor(private service : ServiceService) { }

  ngOnInit(): void {
    this.getAllPost();
    this.getOnePostById();
  }

  getAllPost() {
    this.service.getAllPost().subscribe(responseBody => {
      this.postList = responseBody;
      console.log(responseBody);
    })
  }

  getOnePostById() {
    this.service.getOnePostById().subscribe(responseBody => {
      this.post = responseBody;
      console.log(responseBody);
    });
  }

/*   getAllCommentsbyPostId() {
    this.service.getAllCommentsByPostId().subscribe(responseBody => {
      this.comments = responseBody.data;
    });
  }
 */
}
