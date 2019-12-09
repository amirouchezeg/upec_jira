import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
// import { Response } from "@angular/http";
import { Observable } from 'rxjs';
import { Issues } from '../_model/issues';




@Injectable({
  providedIn: 'root'
})
export class IssuesService {
  readonly rootUrl = 'http://localhost:8080/api/issues';

  constructor(private http: HttpClient) { }

  getIssue(idSprint){
    return this.http.get(this.rootUrl);
  }

  addIssue(issue: Issues){
    return this.http.post(this.rootUrl, issue);
  }

}