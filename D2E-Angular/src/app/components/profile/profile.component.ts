import { Component, OnInit } from '@angular/core';
import { Like } from 'src/app/models/Like';
import { Post } from 'src/app/models/Post';
import { User } from 'src/app/models/User';
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

  like: Like = <Like>{};
  likeList : Array<Like> = [];
  user : User = <User>{};
  likeGem : boolean = true;
  likeGemVisibility : boolean = true;

  constructor(private service : ServiceService) { }

  ngOnInit(): void {
    this.checkSession();
    
    //this.getAllPost();

    this.getAllPostGivenUserId();
  }
  checkSession(){
    this.service.checkSession().subscribe(responseBody => {
      this.user = responseBody;
      console.log(this.user.userId);
    })
  }
  getAllPostGivenUserId() {
    this.service.checkSession().subscribe(responseBody => {
      this.user = responseBody;
      console.log(this.user.userId);
    
    this.service.getAllPostByUserId(this.user.userId).subscribe(responseBody => {
      this.postList = responseBody;
      console.log(this.postList);
    })
    })
  }

  getAllPost() {
    this.service.getAllPost().subscribe(responseBody => {
      this.postList = responseBody;
      console.log(this.postList);
    })
  }

  // getOnePostById(post : Post) {
  //   this.service.getOnePostById().subscribe(responseBody => {
  //     this.post = post;
  //     console.log(post);
  //   });
  // }

  createLike(postId : any) {
    // e.preventDefault();

    this.service.getUserbyUserId().subscribe(userToLike => {
      this.user = userToLike;
      console.log(this.user);

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
  }

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
    this.service.getOneLike().subscribe(responseBody => {
      console.log(responseBody)
      this.like = responseBody;

      this.service.deleteLike(this.like.likesId).subscribe()
    })
  }

  // updateLikeCount() {
  //   this.service.updateLikeCount().subscribe(responseBody => {
  //     this.post.commentCount = responseBody.commentCount;
  //     this.post.likesCount = responseBody.likesCount;
  //   })
  // }
}


