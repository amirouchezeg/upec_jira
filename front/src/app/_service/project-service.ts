import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Project } from '../_model/project';
import { Auth } from './auth';

@Injectable()
export class ProjectService {
  rootUrl:string;
  auth:Auth;

  constructor(private http: HttpClient) {
    this.auth=Auth.getInstance(); 
    this.rootUrl=this.auth.getRootUrl()+"projects/";
  }

  addProject(project: Project){
    return this.http.post(this.rootUrl, project,
      {headers: this.auth.headers} );
  }

  getAllProject(){
    return this.http.get(this.rootUrl,
      {headers: this.auth.headers} );
  }

  getAllProjectOfUser(){
    return this.http.get(this.rootUrl+"users/"+this.auth.email,
      {headers: this.auth.headers} );
  }
  deleteProject(id : number){
    return this.http.delete(this.rootUrl + id,
    {headers: this.auth.headers} );
  }

  findById(id: string){
    return this.http.get(this.rootUrl + id,
    {headers: this.auth.headers} );
  }

  update(project : Project, id:string){
    return this.http.put(this.rootUrl + id, project,
    {headers: this.auth.headers} )
  }
}