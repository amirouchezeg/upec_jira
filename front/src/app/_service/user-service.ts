import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
// import { Response } from "@angular/http";
import { Observable, Subject } from 'rxjs';
import { User } from '../_model/user';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  // readonly rootUrl = 'http://localhost:8080/api/users'; 
  readonly rootUrl = 'http://localhost:8080/api/users'; //port? url service....

  private httpOptions;
  private subject = new Subject<any>();
  constructor(private http: HttpClient) { }

  sendProfilList(profilList: string) {
    this.subject.next(profilList);
  }

  clearProfilList() {
      this.subject.next();
  }

  getProfilList(): Observable<any> {
      return this.subject.asObservable();
  }
  //it the user conneced send message 'true'
  

  // registerUser(user: User) {
  //   const body: User = {
  //     UserName: user.UserName,
  //     Password: user.Password,
  //     Email: user.Email,
  //     FirstName: user.FirstName,
  //     LastName: user.LastName
  //   }
  //   var reqHeader = new HttpHeaders({'No-Auth':'True'});
  //   return this.http.post(this.rootUrl + '/api/User/Register', body,{headers : reqHeader});
  // }

  userAuthentication(userName, password) {
    var data = "username=" + userName + "&password=" + password + "&grant_type=password";
    var reqHeader = new HttpHeaders({ 'Content-Type': 'application/x-www-urlencoded','No-Auth':'True' });
    return this.http.post(this.rootUrl + '/token', data, { headers: reqHeader });
  }

  // getUserClaims(){
  //  return  this.http.get(this.rootUrl+'/api/GetUserClaims');
  // }


  addUser(user: User){
    return this.http.post(this.rootUrl, user);
  }

  login(email: string, password: string){
    let url = '/login'
    return this.http.post(this.rootUrl+url, {email: email, password : password});
  }

  //todo :make this in project service and rename the method to get project
  getMembersOfProject(idProject: string) {
    return this.http.get("http://localhost:8080/api/projects/"+idProject);    
  }

}