export class Project {

    /*whe shold to use the 'new' key when create instance */
    // constructor(title:string,description:string,dateStart:Date,dateEnd:Date,teamEmails:string[]) { 
    //     this.title = title; 
    //     this.description = description; 
    //     this.dateStart = dateStart; 
    //     this.dateEnd = dateEnd; 
    //     this.teamEmails = teamEmails; 
    // }

    title:string;
    description:string;
    start_date:Date;
    end_date:Date;
    create_date: Date;
    users;

    // isValide():boolean {
    //     // console.log("teamEmails",this.teamEmails);
    //     let validateEmail:boolean=true;
    //     let regexp = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
    //     this.teamEmails.forEach(item=>{
    //         validateEmail= validateEmail && regexp.test(item);
    //     });

    //     return validateEmail;

    // } 
}