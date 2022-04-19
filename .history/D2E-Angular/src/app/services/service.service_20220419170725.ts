import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Post } from '../models/Post';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {


  postId : number = 1;
  userId : number = 1;
  commentId : number = 1;
  post : Post = <Post>{};

  constructor(private httpCli : HttpClient) { }

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

  createPost(postBody : string) {
    return this.httpCli.post<any>(`${environment.domain}/post`, {
      "postBody" : postBody
    }, {
      withCredentials: true
    })
  }
  createUser(username: string, password: string, email: string, firstname: string, lastname: string, location: string){
    
    this.service.createUser(this.username, this.password, this.email, this.firstname, this.lastname, this.location).subscribe(responseBody => {
      this.username="";
      this.password="";
      this.email="";
      this.firstname="";
      this.lastname="";
      this.location="";
      this.users.push(responseBody);
    })

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
