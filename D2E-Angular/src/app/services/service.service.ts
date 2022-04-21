import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core';
import { NumberValueAccessor } from '@angular/forms';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { Like } from '../models/Like';
import { Post } from '../models/Post';
import { User } from '../models/User';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  postId : number = 1;
  userId : number = 1;
  commentId : number = NaN;
  post : Post = <Post>{};
  user : User = <User>{};
  postId_fk : number = 1;
  likesId : number = 1;

  /* username: string = "Cloud";
  password: string = "pass1"; */

  constructor(private httpCli : HttpClient, private router: Router) { }

  login(username: string, password: string){

    return this.httpCli.post<any>(`${environment.domain}/session`, {
      "username": username,
      "password": password}, {
      withCredentials : true}
    );
  }

  checkSession(){
    return this.httpCli.get<any>(`${environment.domain}/session`, {
      withCredentials: true
    });

  }

  logout(){
    return this.httpCli.delete<any>(`${environment.domain}/session`, {
      withCredentials: true
    });
  }

  getUserbyUserId() {
    return this.httpCli.get<User>(`${environment.domain}/user/${this.userId}`, {
      withCredentials: true
    })
  }
  
  getAllPost() {
    return this.httpCli.get<any>(`${environment.domain}/post`);
  }

  getAllPostByUserId() {
    return this.httpCli.get<any>(`${environment.domain}post/userId/${this.userId}`, {
      withCredentials: true
    })
  }

  getOnePostById() {
    return this.httpCli.get<Post>(`${environment.domain}/post/${this.postId}`, {
      withCredentials: true
    })
  }

  getOneComment() {
    return this.httpCli.get<Comment>(`${environment.domain}/comment/${this.commentId}`, {
      withCredentials: true
    })
  }

  getAllCommentsByPostId() {
    return this.httpCli.get<any>(`${environment.domain}/comment/post/${this.postId}/comment`, {
      withCredentials: true
    })
  }

  createPost(post : Post) {
    return this.httpCli.post<any>(`${environment.domain}/post`, 
    post, {
      withCredentials: true
    })
  }

  getOneLike() {
    return this.httpCli.get<any>(`${environment.domain}/likes/${this.likesId}`, {
      withCredentials: true
    })
  }

  createLike(like : Like) {
    return this.httpCli.post<any>(`${environment.domain}/likes`, 
    like, {
      withCredentials: true
    })
  }

  deleteLike(likesId : number) {
    return this.httpCli.delete<any>(`${environment.domain}/likes/${likesId}`, {
      withCredentials: true
    })
  }

  updateLikeCount() {
    return this.httpCli.patch<any>(`${environment.domain}/post/${this.postId}/count/${this.postId_fk}`, {
      withCredentials: true
    })
  }

  createUser(username: string, password: string, email: string, firstname: string, lastname: string, location: string){
    

    console.log({
      "username": username,
      "password": password,
      "email": email,
      "firstname": firstname,
      "lastname": lastname,
      "location": location

    })
    return this.httpCli.post<any>(`${environment.domain}/user`,{
      "username": username,
      "password": password,
      "email": email,
      "firstname": firstname,
      "lastname": lastname,
      "location": location

    },{
      withCredentials: true
    })
  }
}
