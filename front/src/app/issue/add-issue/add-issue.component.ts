import { Component, OnInit, Inject } from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { MatChipInputEvent, MAT_DIALOG_DATA, MatDialogRef, MatSnackBar } from '@angular/material'; 
import { IssuesService } from 'src/app/_service/issues-service';
import { Issues } from 'src/app/_model/issues';
import { MyAlert } from 'src/app/_model/myAlert';

export interface Status {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-add-issue',
  templateUrl: './add-issue.component.html',
  styleUrls: ['../issue.component.css']
})
export class AddIssueComponent implements OnInit {

  emailsMember=[];
  status: Status[] = [
    {value: 'preview', viewValue: 'À FAIRE'},
    {value: 'toDo', viewValue: 'OUVERT'},
    {value: 'inProgress', viewValue: 'EN COURS'},
    {value: 'finished', viewValue: 'TERMINÉ'},
  ];
  alert:MyAlert;

  isProgressVisible:boolean=false;
  sprintId :string;
  titleOfDailogBox :string;
  titleFC : FormControl;
  descriptionFC : FormControl;
  start_dateFC : FormControl;
  end_dateFC : FormControl;
  statusFC : FormControl;
  emailUserFC : FormControl;
  sprint_idFC : FormControl;
  issueform: FormGroup;
  issue:Issues;
  isAddAction:boolean;

  constructor(private dialogRef:MatDialogRef<AddIssueComponent>,private _snackBar: MatSnackBar,
      @Inject(MAT_DIALOG_DATA) public data: string, private issuesService:IssuesService ) {
    //get the sprint id sended from page of sprint
    var jsonData= JSON.parse(JSON.stringify(data));
    this.isAddAction=jsonData.data.type=='add'?true:false;                       
    if (this.isAddAction) {
      this.titleOfDailogBox="Ajouter Une Tâche";
      this.sprintId =JSON.parse(JSON.stringify(jsonData.data.idSprint));
      this.emailsMember=jsonData.data.emailsMember;
    } else {
      this.titleOfDailogBox="Modifie La Tâche";
      this.issue=jsonData.data.issue;
      this.emailsMember=jsonData.data.emailsMember;
    }
  }
  
  ngOnInit() {
    this.alert=new MyAlert();
    this.titleFC = new FormControl(this.issue? this.issue.title: '');
    this.descriptionFC = new FormControl(this.issue? this.issue.description: '');
    this.start_dateFC = new FormControl(this.issue? this.issue.start_date: '');
    this.end_dateFC = new FormControl(this.issue? this.issue.end_date: '');
    this.statusFC = new FormControl(this.issue? this.issue.status: '');
    try {
      this.emailUserFC = new FormControl(this.issue? this.issue.users.email: '');
    } catch (error) {
      this.emailUserFC = new FormControl('');      
    }
    this.sprint_idFC = new FormControl(this.issue? this.issue.sprint_id: this.sprintId);

    this.issueform = new FormGroup({
      'title': this.titleFC,
      'description': this.descriptionFC,
      'start_date': this.start_dateFC,
      'end_date': this.end_dateFC,
      'status': this.statusFC,
      'userEmail': this.emailUserFC,
      'sprint_id': this.sprint_idFC,
      // 'create_date': this.create_dateFC,
    });
  }

  /*on Click*/
  onSubmit(){
    if (this.isAddAction) {
      console.log("onSubmit add",this.issueform.value);
      this.addIssue();
    } else {
      console.log("onSubmit edit",this.issueform.value);
      this.editIssue();     
    }
  }

  editIssue() {
    this.issuesService.editIssue(this.issue._id,this.issueform.value).subscribe( data => {
      console.log("edit issue",data);
      this.dialogRef.close();
      // var jsonData=  JSON.parse(JSON.stringify(data));                       
      // let issue =JSON.parse(JSON.stringify(jsonData.data)); 
    });
  }

  addIssue() {
    this.issuesService.addIssue(this.issueform.value).subscribe( 
      data => {
        console.log("add issue",data);
        this.dialogRef.close();
        // var jsonData=  JSON.parse(JSON.stringify(data));                       
        // let issue =JSON.parse(JSON.stringify(jsonData.data)); 
      },
      error => { 
        console.log("error",error);
        var jsonData=  JSON.parse(JSON.stringify(error));                       
        let data =JSON.parse(JSON.stringify(jsonData.error)); 
        this.alert.isDisplayed=true;
        this.alert.message=data.message;
      });
  }

  onResendInvitation(){
    //todo : test this request
    this.issuesService.resendInvetation(this.emailUserFC.value).subscribe( 
      data => {
        console.log("resend invetation",data);
        this.toast("L'operation a effectué avec succès",'bg-success');

        this.dialogRef.close();
      },
      error => { 
        console.log("error",error);
        this.toast("L'opération a échoué",'bg-danger');

        this.dialogRef.close();
      }
    );
  }

  toast(message:string,css_class:string="",time:number=2900){
    this._snackBar.open(message,"", {
      verticalPosition:'top',
      panelClass: [css_class],
      duration: time,
    });
  }

}
