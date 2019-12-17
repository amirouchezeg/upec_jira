import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
// import { Response } from "@angular/http";
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Issues } from '../_model/issues';




@Injectable({
  providedIn: 'root'
})
export class IssuesService {
  readonly rootUrl = 'http://localhost:8080/api/issues';

  editIssue(idIssue: string,issue: Issues) {
    return this.http.put(this.rootUrl+"/"+idIssue, issue);    
  }

  constructor(private http: HttpClient) { }

  getIssueOfSprint(idSprint){
    return this.http.get("http://localhost:8080/api/sprints/"+idSprint+"/issues");
  }

  addIssue(issue: Issues){
    return this.http.post(this.rootUrl, issue);
  }

  resendInvetation(email: String){
    return this.http.post("http://localhost:8080/api/users/resend_email", {email:email});
  }

}