import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
// import { Response } from "@angular/http";
import { Observable } from 'rxjs';
import { Project } from '../_model/project';

@Injectable()
export class ProjectService {
  readonly rootUrl = 'http://localhost:8080/api/projects';

  constructor(private http: HttpClient) { }

  addProject(project: Project){
    return this.http.post(this.rootUrl, project);
  }

}