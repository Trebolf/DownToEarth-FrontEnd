import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Post } from '../models/Post';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  postId : number = NaN;
  commentId : number = 1;
  post : Post = <Post>{};

  constructor(private httpCli : HttpClient) { }

  getAllPost() {
    return this.httpCli.get<any>(`${environment.domain}/post`);
  }

  getOnePostById() {
    return this.httpCli.get<Post>(`${environment.domain}/post/${this.postId}`);
  }

  getOneComment() {
    return this.httpCli.get<Comment>(`${environment.domain}/comment/${this.commentId}`)
  }

  getAllCommentsByPostId() {
    return this.httpCli.get<any>(`${environment.domain}/comment/post/${this.postId}/comment`)
  }

  createPost(postBody : string) {
    return this.httpCli.post<any>(`${environment.domain}/post`, {
      "postBody" : postBody
    }, {
      withCredentials: true
    })
  }
}
