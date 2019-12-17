import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
// import { Response } from "@angular/http";
import { Observable } from 'rxjs';
import { Sprint } from '../_model/sprint';
import { identifierModuleUrl } from '@angular/compiler';


@Injectable()
export class SprintService {
  readonly rootUrl = 'http://localhost:8080/api/sprints';

  constructor(private http: HttpClient) { }

  addSprint(sprint: Sprint){
    return this.http.post(this.rootUrl, sprint);
  }

  getAllSprint(){
    return this.http.get(this.rootUrl);
  }

  deleteSprint(id: number){
    return this.http.delete(this.rootUrl + "/" + id);
  }

  findById(id: string){
    return this.http.get(this.rootUrl + "/" + id);
  }

  update(sprint : Sprint, id:string){
    return this.http.put(this.rootUrl + "/" + id, sprint)
  }
}