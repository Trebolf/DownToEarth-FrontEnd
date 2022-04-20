import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
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

  constructor(private httpCli : HttpClient) { }

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
