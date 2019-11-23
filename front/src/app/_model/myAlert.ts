export class MyAlert {
    
    message:string;
    type:string;
    isDisplayed:boolean;
    /*whe shold to use the 'new' key when create instance */
    constructor(message:string, type:string) { 
        this.message=message;
        this.type=type;
        this.isDisplayed=false;
    }
    
    showAlert(){
        this.type="alert-danger";
        this.isDisplayed=true;
    }

    hide(){
        this.isDisplayed=false;
    }
    

}