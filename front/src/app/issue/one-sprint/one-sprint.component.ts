import { Component, OnInit } from '@angular/core';
import { AddIssueComponent } from '../add-issue/add-issue.component';
import { MatDialog, MatSnackBar } from '@angular/material';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import { Inject} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {  FormControl, FormGroup } from '@angular/forms';
import { IssuesService } from 'src/app/_service/issues-service';
import { Issues } from 'src/app/_model/issues';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/_service/user-service';
import { IssueDetailComponent } from '../issue-detail/issue-detail.component';


@Component({
  selector: 'app-one-sprint',
  templateUrl: './one-sprint.component.html',  
  styleUrls: ['../issue.component.css']
})
export class OneSprintComponent implements OnInit {

  currantIssue="currantIssue";
  idSprint:string;
  idProject:string;
  preview:Issues[]=[];
  todo:Issues[]=[];
  in_progress:Issues[]=[];
  done:Issues[]=[];
  emailsMember:Issues[]=[];

  constructor(private userService:UserService,private dialog: MatDialog, private issueService: IssuesService, private route: ActivatedRoute) {
    this.idSprint =this.route.snapshot.paramMap.get('idSprint');
    this.idProject =this.route.snapshot.paramMap.get('idProject');
  }
  
  ngOnInit() {
    this.getAllIssueOfSprint(this.idSprint);
    this.getEmailOfPreject(this.idProject);
  }

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,event.container.data,event.previousIndex,event.currentIndex);
      this.changeStatus(event.container.id,event.container.data[event.currentIndex]);
      if (!this.isHaveUser(event.container.data[event.currentIndex])) {
        this.onOpenSignedTo(event.container.data[event.currentIndex]);
      }else{
        console.log(this.isHaveUser(event.container.data[event.currentIndex]));
      }
    }
  }

  changeStatus(status: string, issue) {
    if (status=="cdk-drop-list-0")
      status="preview";
    else if(status=="cdk-drop-list-1")
      status="toDo";
    else if(status=="cdk-drop-list-2")
      status="inProgress";
    else if(status=="cdk-drop-list-3")
      status="finished";
    
    let mIssue:Issues=(issue as Issues);
    mIssue.status=status;
    //edit the issue
    this.issueService.editIssue(mIssue._id,mIssue).subscribe( data => {
      console.log("edit issue",data);
    });

  }

  isHaveUser(issueMoved):boolean{
    let mIssue:Issues=(issueMoved as Issues);
    if(mIssue.users)
      return true;
    return false;
  }

  onOpenSignedTo(issue:String){
    console.log("dialog onOpenSignedTo()");
    const dialogRef = this.dialog.open(DialogOverviewSigneTo, {
      width: '390px',
      height: '190px',
      data: {
        emailsMember:this.emailsMember,
        issue:issue
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      this.getAllIssueOfSprint(this.idSprint);      
    });
  }


  onDetailIssue(issue){
    console.log("issue",issue);
    const dialogRef = this.dialog.open(IssueDetailComponent,{
      // height: '40%',
      width: '60%',
      data: {issue: issue}
    });
  }

  onDailoIssue(typeOfDialog:string , issue:Issues){
    let data={};
    if (typeOfDialog=='edit') {
      data={
        type: "edit",
        issue: issue,
        emailsMember:this.emailsMember
      };
    } else if(typeOfDialog=='add') {
      data={
        type:"add",
        idSprint: this.idSprint,
        emailsMember:this.emailsMember
      };
    }
    const dialogRef = this.dialog.open(AddIssueComponent,{
      // height: '40%',
      width: '60%',
      data: {data: data}
    });
    dialogRef.afterClosed().subscribe(result => {
      this.getAllIssueOfSprint(this.idSprint);
      // this.animal = result;
    });
    // .componentInstance.submitClicked.subscribe((project:Project)=>{
    //   console.log("from parent ",project);
    //   this.projects.push(6);
    // });
  }

  getAllIssueOfSprint(idSprint:String){
    this.preview=[];
    this.todo=[];
    this.in_progress=[];
    this.done=[];
    this.issueService.getIssueOfSprint(idSprint).subscribe( data => {
      // console.log("data",data);
        var jsonData=  JSON.parse(JSON.stringify(data));                       
        let issues =JSON.parse(JSON.stringify(jsonData.data)); 
        issues.forEach(issue => {
          switch(issue.status) { 
            case "toDo": { 
              this.todo.push(issue);
              // console.log("issue",issue);
              break;
            } 
            case "inProgress": {
              this.in_progress.push(issue);                
              break;
            }
            case "finished": { 
              this.done.push(issue);                                
              break;
            }
            case "preview": { 
              this.preview.push(issue);
              break; 
            }
          } 
          
          // this.preview.push(issue);
          // console.log("issues",issue);
        });
      });
  }

  getEmailOfPreject(idProject:string){
   
    this.userService.getMembersOfProject(idProject).subscribe( data => {
      var jsonData=  JSON.parse(JSON.stringify(data));                       
      let users =JSON.parse(JSON.stringify(jsonData.data.users));
      for (var i = 0; i < users.length; i++){
        var obj = users[i];
        this.emailsMember.push(obj['email']);
      }
    });
  }

}

@Component({
  selector: 'dialog-overview-signe-to',
  templateUrl: 'signed-to-dialog.html',
  styleUrls: ['../issue.component.css']
})
export class DialogOverviewSigneTo {
  options: string[] = [];
  issue:Issues;
  issueform: FormGroup;
  emailFC : FormControl;

  constructor(private _snackBar: MatSnackBar,private issuesService: IssuesService,public dialogRef: MatDialogRef<DialogOverviewSigneTo>,@Inject(MAT_DIALOG_DATA) public data: string) {
    var jsonData= JSON.parse(JSON.stringify(data));
    this.options =JSON.parse(JSON.stringify(jsonData.emailsMember));
    this.issue=JSON.parse(JSON.stringify(jsonData.issue)) as Issues;

    this.emailFC = new FormControl(this.issue.users? this.issue.users.email: '');
    this.issueform = new FormGroup({
      'email': this.emailFC,
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  /*on Click*/
  onSubmit(){
    this.issue.userEmail=this.emailFC.value;
    console.log("onSubmit",this.emailFC.value);
    console.log("issue",this.issue);
    this.issuesService.editIssue(this.issue._id,this.issue).subscribe( 
      data => {
        console.log("edit issue",data);
        this.dialogRef.close();
    },error => { 
      console.log("error",error);
      var jsonData=  JSON.parse(JSON.stringify(error));                       
      let data =JSON.parse(JSON.stringify(jsonData.error));
      this._snackBar.open(data.message,"Renvoyer l'invitation", {
        verticalPosition: 'top',
        duration: 8000,
      }).onAction().subscribe(() => {
        // this.router.navigateByUrl("/user/signin");
        //todo test this request
        this.issuesService.resendInvetation(this.emailFC.value).subscribe( 
          data => {
            console.log("resend invetation",data);
          },
          error => { 
            console.log("error",error);
          });
      });
    });

  }

}
