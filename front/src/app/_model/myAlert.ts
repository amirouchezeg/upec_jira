export class MyAlert {
    
    message:string;
    type:string;
    isDisplayed:boolean;
    /*we shold to use the 'new' key when create instance */
    constructor(message:string="", type:string="alert-danger") { 
        this.message=message;
        this.type=type;
        this.isDisplayed=false;
    }

    showAlert(type:string){
        this.type=type;
        this.isDisplayed=true;
    }

    hide(){
        this.isDisplayed=false;
    }
    

}