import { Component, OnInit } from '@angular/core';
import { AddIssueComponent } from '../add-issue/add-issue.component';
import { MatDialog } from '@angular/material';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import { Inject} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {  FormControl } from '@angular/forms';
import { IssuesService } from 'src/app/_service/issues-service';
import { Issues } from 'src/app/_model/issues';
import { ActivatedRoute } from '@angular/router';

export interface DialogData {
  animal: string;
  name: string;
}

@Component({
  selector: 'app-one-sprint',
  templateUrl: './one-sprint.component.html',  
  styleUrls: ['../issue.component.css']
})
export class OneSprintComponent implements OnInit {

  currantIssue="currantIssue";
  idSprint:string;
  preview:Issues[]=[];
  todo:Issues[]=[];
  in_progress:Issues[]=[];
  done:Issues[]=[];

  constructor(private dialog: MatDialog, private issueService: IssuesService, private route: ActivatedRoute) {
    this.idSprint =this.route.snapshot.paramMap.get('idSprint');
  }

  ngOnInit() {
    this.getAllIssue();
  }

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      console.log("event.previousContainer.data",event.previousContainer.data);
      console.log("event.container.data",event.container.data);
      transferArrayItem(event.previousContainer.data,
                        event.container.data,
                        event.previousIndex,
                        event.currentIndex);
    }
    if (this.fromPreview_to_todo(event.container.data[0])) {
      this.onOpenSignedTo();//to call only if the issue is from preview to todo list
    }
    
  }

  fromPreview_to_todo(issueMoved):boolean{
    //check the status
    return true;
  }

  onOpenSignedTo(){
    console.log("dialog onOpenSignedTo()");
    const dialogRef = this.dialog.open(DialogOverviewSigneTo, {
      width: '390px',
      height: '190px',
      data: {currantIssue: this.currantIssue}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      console.log('this.currantIssue',result);
      // this.animal = result;
    });
  }

  onDailoIssue(typeOfDialog:string , issue:Issues){
    let data={};
    if (typeOfDialog=='edit') {
      data={
        type: "edit",
        issue: issue};
    } else if(typeOfDialog=='add') {
      data={
        type:"add",
        idSprint: this.idSprint};
    }
    const dialogRef = this.dialog.open(AddIssueComponent,{
      // height: '40%',
      width: '60%',
      data: {data: data}
    })
    // .componentInstance.submitClicked.subscribe((project:Project)=>{
    //   console.log("from parent ",project);
    //   this.projects.push(6);
    // });
  }

  getAllIssue(){
    this.issueService.getIssue("").subscribe( data => {
      // console.log("data",data);
        var jsonData=  JSON.parse(JSON.stringify(data));                       
        let issues =JSON.parse(JSON.stringify(jsonData.data)); 
        issues.forEach(issue => {
          // console.log("issues",issue.status);
          switch(issue.status) { 
            case "toDo": { 
              this.todo.push(issue);
              break;
            } 
            case "inProgress": { 
              this.preview.push(issue);                
              break;
            } 
            case "finished": { 
              this.done.push(issue);                                
              break;
            }
            case "preview": { 
              this.in_progress.push(issue);
              break; 
            }
          } 
          
          // this.preview.push(issue);
          // console.log("issues",issue);
        });
      });
  }
  // http://localhost:8080/api/issues

}

@Component({
  selector: 'dialog-overview-signe-to',
  templateUrl: 'signed-to-dialog.html',
  styleUrls: ['../issue.component.css']
})
export class DialogOverviewSigneTo {
  myControl = new FormControl();
  options: string[] = ['One', 'Two', 'Three'];


  constructor(public dialogRef: MatDialogRef<DialogOverviewSigneTo>,@Inject(MAT_DIALOG_DATA) public idSprint: string) {
    console.log("idSprintidSprint",idSprint);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  /*on Click*/
  onSubmit(){
    console.log("onSubmit","this.issueform.value");

  }

}
