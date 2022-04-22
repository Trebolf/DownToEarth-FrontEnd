import { AfterContentInit, Component, DoCheck, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Like } from 'src/app/models/Like';
import { Post } from 'src/app/models/Post';
import { User } from 'src/app/models/User';
import { ServiceService } from 'src/app/services/service.service';

@Component({
  selector: 'app-parent',
  templateUrl: './parent.component.html',
  styleUrls: ['./parent.component.css']
})
export class ParentComponent implements OnInit{

  postList : Array<Post> = [];
  post : Post = <Post>{};
  comments : Comment = <Comment>{};
  like: Like = <Like>{};
  likeList : Array<Like> = [];

  @Input()
  user : User = <User>{};

  likeGem : boolean = true;
  likeGemVisibility : boolean = true;

  constructor(private service : ServiceService) { }

  ngOnInit(): void {
    this.getAllPost();
  }

  getAllPost() {
    this.service.getAllPost().subscribe(responseBody => {
      this.postList = responseBody;
    })
  }

  // getOnePostById() {
  //   this.service.getOnePostById(postId).subscribe(responseBody => {
  //     this.post = responseBody;
  //     console.log(responseBodgy);
  //   });
  // }

  // separateEachPost() {

  //   let postIndex = 0;

  //   this.service.getAllPost().subscribe(responseBody => {
  //     this.postList = responseBody;
  //     console.log(responseBody);

  //     postIndex = responseBody.target.id - 1;
  //     console.log(postIndex);

  //     this.service.getOnePostById().subscribe(isolatedPost => {
  //       this.post = isolatedPost;

  //       console.log(isolatedPost)
  //     })
  //   })
  // }

  createLike(postId : any) {
    /* e.preventDefault(); */

    console.log(postId);

    this.service.checkSession().subscribe(userToLike => {
      this.user = userToLike;
      console.log(userToLike);

        this.service.getOnePostById(postId).subscribe(postToLike => {
          this.post = postToLike;
          console.log(this.post);

          this.like.user = userToLike;
          this.like.post = postToLike;
          console.log(this.like);

          this.service.createLike(this.like).subscribe(responseBody => {
            this.likeList.push(responseBody.data);
          })
      });
    })
    this.updateLikeCount(postId);
    this.toggleLikeButton();
  }

  /* createLike2(postId : number) {

    this.service.checkSession().subscribe(userToLike => {
      this.user = userToLike;
      console.log(userToLike);

      this.service.getOnePostById().subscribe(postToLike => {
        this.like.post = postToLike;
        this.like.user = userToLike;
        console.log(this.like);
        
        this.service.createLike(this.like).subscribe(responseBody => {
          this.likeList.push(responseBody.data);
        });
      })
    })
  } */

  setButton() {
    this.likeGem = this.likeGemVisibility;
  }

  toggleLikeButton() {
    if (this.likeGemVisibility == true) {
      this.likeGemVisibility = false;
    } else {
      this.likeGemVisibility = true;
    }

    this.setButton();
  }

  deleteLike(e : any) {

    let postId = e.target.id;
    let index = 0;

    this.service.deleteLike(postId).subscribe(responseBody => {
      //find like to remove
      this.likeList.forEach((like, i) => {
        if(like.post.postId == postId){
          index = i;
        }
      })
      this.likeList.splice(index, 1);
    })
  }

  deleteLike2() {
    
    let postId;

    this.service.getOneLike().subscribe(responseBody => {
      console.log(responseBody)
      this.like = responseBody;

      this.service.deleteLike(this.like.likesId).subscribe()
    })
    this.updateLikeCount(postId);
    this.toggleLikeButton();
  }

  updateLikeCount(postId : any) {
    this.service.updateLikeCount(postId).subscribe(responseBody => {
      this.post.commentCount = responseBody.commentCount;
      this.post.likesCount = responseBody.likesCount;
    })
  }
}
