import { HttpHeaders } from '@angular/common/http';


export class Auth  {
    private static instance: Auth;

    _id:string;
    isConnected:boolean;
    token:string;
    email:string;
    private rootUrl:string = 'http://localhost:8080/api/';
    headers :HttpHeaders;

    private constructor() {
        console.log("auth()");
        if (localStorage.getItem('token')) {
          let user=JSON.parse(localStorage.getItem('token'));
          this.token=user.token;
          this._id=user.data._id;
          this.email=user.data.email;
          this.headers=new HttpHeaders({
            'x-access-token':  this.token    
          });
       
          this.connected();
        }else{
            this.desconnected();
        }
    }

    public static getInstance(): Auth {
        if (!Auth.instance) {
            Auth.instance = new Auth();
        }

        return Auth.instance;
    }

    connected(){
        this.isConnected=true;
    }


    desconnected(){
        this.isConnected=false;
    }

    getRootUrl(){
        return this.rootUrl;
    }
}