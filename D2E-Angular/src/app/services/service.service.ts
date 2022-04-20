import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core';
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
  commentId : number = 1;
  post : Post = <Post>{};
  user : User = {
    userId: 1, 
    email: "Cloud7@email.com", 
    username: "Cloud", 
    password:"pass1", 
    firstName: "Cloud", 
    lastName: "Strife", 
    location: ""
  };

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
    return this.httpCli.delete<any>('http://localhost:9000/session', {
      withCredentials: true
    });
  }

  getUserbyUserId() {
    return this.httpCli.get<User>(`${environment.domain}/user/${this.userId}`);
  }
  
  getAllPost() {
    return this.httpCli.get<any>(`${environment.domain}/post`);
  }

  getAllPostByUserId() {
    return this.httpCli.get<any>(`${environment.domain}post/userId/${this.userId}`);
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

  createPost(post : Post) {
    return this.httpCli.post<any>(`${environment.domain}/post`, 
    post, {
      withCredentials: true
    })
  }

  createLike(like : Like) {
    return this.httpCli.post<any>(`${environment.domain}/likes`, 
    like, {
      withCredentials: true
    })
  }

  deleteLike() {
    return this.httpCli.delete<any>(`${environment.domain}/likes`, {
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
