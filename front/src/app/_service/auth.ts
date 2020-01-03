

export class Auth {
    private static instance: Auth;

    _id:string;
    isConnected:boolean;
    token:String;
    private rootUrl:String = 'http://localhost:8080/api/';

    private constructor() {
        console.log("auth()");
        if (localStorage.getItem('token')) {
          let user=JSON.parse(localStorage.getItem('token'));
          this.token=user.token;
          this._id=user.data._id;
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