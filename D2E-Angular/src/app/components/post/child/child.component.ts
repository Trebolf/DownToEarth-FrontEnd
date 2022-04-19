import { Component, OnInit } from '@angular/core';
import { Comment } from 'src/app/models/Comment';
import { ServiceService } from 'src/app/services/service.service';

@Component({
  selector: 'app-child',
  templateUrl: './child.component.html',
  styleUrls: ['./child.component.css']
})
export class ChildComponent implements OnInit {

  commentList : Array<Comment> = [];
  comments : Comment = <Comment>{};
  comment : Comment = <Comment>{};

  constructor(private service : ServiceService) { }

  ngOnInit(): void {
    //this.getAllCommentsbyPostId();
    this.getAllCommentsByPostId2();
    /* this.getOneComment(); */
  }

  /* getOneComment() {
    this.service.getOneComment().subscribe(responseBody => {
      this.comment = responseBody;
      console.log(responseBody);
    });
  } */

  getAllCommentsbyPostId() {
    this.service.getAllCommentsByPostId().subscribe(responseBody => {
      this.comments = responseBody.data;
      console.log(responseBody);
    });
  }

  getAllCommentsByPostId2() {
    this.service.getAllCommentsByPostId().subscribe(responseBody => {
      this.commentList = responseBody;
      console.log(responseBody);
    });
  }

}
