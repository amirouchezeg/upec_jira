import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
// import { Response } from "@angular/http";
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Issues } from '../_model/issues';
import { Comments } from '../_model/comments';
import { Auth } from './auth';




@Injectable({
  providedIn: 'root'
})
export class IssuesService {
  rootUrl:string;
  auth:Auth;
  constructor(private http: HttpClient) {
    this.auth=Auth.getInstance(); 
    this.rootUrl=this.auth.getRootUrl()+"issues/";
  }

  editIssue(idIssue: string,issue: Issues) {
    return this.http.put(this.rootUrl+"/"+idIssue, issue,
    {headers: this.auth.headers} );    
  }


  getIssueOfSprint(idSprint){
    return this.http.get(this.auth.getRootUrl()+"sprints/"+idSprint+"/issues",
    {headers: this.auth.headers} );
  }

  getIssue(idIssue:string){
    return this.http.get(this.rootUrl+idIssue,
      {headers: this.auth.headers} );
  }

  addIssue(issue: Issues){
    return this.http.post(this.rootUrl, issue,
      {headers: this.auth.headers} );
  }

  resendInvetation(email: String){
    return this.http.post(this.auth.getRootUrl()+"users/resend_email", {email:email},
    {headers: this.auth.headers} );
  }

  ///////commnets

  addComment(comment: Comments){
    return this.http.post(this.auth.getRootUrl()+'comments', comment,
    {headers: this.auth.headers} );
  } 
  
  deleteComment(idComment: string,idIssue:string){
    return this.http.delete(this.auth.getRootUrl()+'issues/'+idIssue+'/comments/'+ idComment,
    {headers: this.auth.headers} );
  } 

}