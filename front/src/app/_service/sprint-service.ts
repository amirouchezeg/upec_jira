import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
// import { Response } from "@angular/http";
import { Observable } from 'rxjs';
import { Sprint } from '../_model/sprint';
import { identifierModuleUrl } from '@angular/compiler';
import { Auth } from './auth';


@Injectable()
export class SprintService {
  auth:Auth;
  sprintUrl:string;

  constructor(private http: HttpClient) { 
    this.auth=Auth.getInstance(); 
    this.sprintUrl=this.auth.getRootUrl()+"sprints/";
  }

  addSprint(sprint: Sprint){
    return this.http.post(this.sprintUrl, sprint,
      {headers: this.auth.headers} );
  }

  getAllSprint(){
    return this.http.get(this.sprintUrl,
      {headers: this.auth.headers} );
  }

  getAllSprintOfPreject(idPreject:String){
    return this.http.get(this.auth.getRootUrl()+"projects/"+idPreject+"/sprints",
    {headers: this.auth.headers} );
  }

  deleteSprint(id: number){
    return this.http.delete(this.sprintUrl + id,
      {headers: this.auth.headers} );
  }

  findById(id: string){
    return this.http.get(this.sprintUrl + id,
      {headers: this.auth.headers} );
  }

  update(sprint : Sprint, id:string){
    return this.http.put(this.sprintUrl + id, sprint,
      {headers: this.auth.headers} )
  }
}