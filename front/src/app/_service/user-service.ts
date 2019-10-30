import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
// import { Response } from "@angular/http";
import { Observable } from 'rxjs';
import { User } from '../_model/user';


@Injectable()
export class UserService {
  // readonly rootUrl = 'http://localhost:8080/api/users'; 
  readonly rootUrl = '/api/users'; //port? url service....

  private httpOptions;

  constructor(private http: HttpClient) { }

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

  getUserClaims(){
   return  this.http.get(this.rootUrl+'/api/GetUserClaims');
  }

  addUser(user: User){
    this.httpOptions = {
      headers: new HttpHeaders({
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept'
        // 'Authorization': 'Bearer '+this.currentFreelancer.token     
      })
    };

    return this.http.post(this.rootUrl, user);
  }

  // getUser(user: User){
  //   let url = "signUp";
  //   return this.http.get('${this.rootUrl}' + url + '/' + user.idUser);
  // }

}