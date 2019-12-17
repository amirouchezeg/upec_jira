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

  getAllProject(){
    return this.http.get(this.rootUrl);
  }

  deleteProject(id : number){
    return this.http.delete(this.rootUrl + "/" + id);
  }

  findById(id: string){
    return this.http.get(this.rootUrl + "/" + id);
  }

  update(project : Project, id:string){
    return this.http.put(this.rootUrl + "/" + id, project)
  }
}