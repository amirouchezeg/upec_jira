import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { User } from '../_model/user';
import { Auth } from './auth';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  private subject = new Subject<any>();
  auth:Auth;
  userUrl:string;

  constructor(private http: HttpClient) {
     this.auth=Auth.getInstance(); 
     this.userUrl=this.auth.getRootUrl()+"users";
  }

  isUserConnected():boolean{
    return this.auth.isConnected;
  }

  sendProfilList(profilList: string) {
    this.subject.next(profilList);
  }

  clearProfilList() {
      this.subject.next();
  }

  getProfilList(): Observable<any> {
      return this.subject.asObservable();
  }

  userAuthentication(userName, password) {
    var data = "username=" + userName + "&password=" + password + "&grant_type=password";
    var reqHeader = new HttpHeaders({ 'Content-Type': 'application/x-www-urlencoded','No-Auth':'True' });
    return this.http.post(this.userUrl + '/token', data, { headers: reqHeader });
  }

  addUser(user: User){
    return this.http.post(this.userUrl, user);
  }
  
  update(user: User){
    return this.http.put(this.userUrl+"/"+this.auth._id, user);
  }

  updatePassword(passwordObject){
    return this.http.post(this.userUrl+"/"+this.auth._id+"/edit_password", passwordObject);
  }

  getUser(){
    return this.http.get("http://localhost:8080/api/users/"+this.auth._id);
  }

  resendEmailCheck(){
    return this.http.get("http://localhost:8080/api/users/send_email_check/"+this.auth._id);
  }

  checkEmail(token: String){
    return this.http.get("http://localhost:8080/api/users/check_email/"+token);
  }

  login(email: string, password: string){
    let url = '/login'
    return this.http.post(this.userUrl+url, {email: email, password : password});
  }

  //todo :make this in project service and rename the method to get project
  getMembersOfProject(idProject: string) {
    return this.http.get("http://localhost:8080/api/projects/"+idProject);    
  }

}