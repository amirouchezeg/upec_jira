import { Component, OnInit } from '@angular/core';
import { AddIssueComponent } from '../add-issue/add-issue.component';
import { MatDialog } from '@angular/material';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import { Inject} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { MatChipInputEvent } from '@angular/material';
import { FormGroup, FormControl } from '@angular/forms';


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
  issues_todo = [1, 5, 7, 8];
  preview= [
    'Preview 1',
    'Preview 2',
    'Preview 3',
  ];

  todo = [
    'todo 1',
    'todo 2',
  ];

  in_progress = [
    'in_progress 1',
    'in_progress 2',
  ];
  
  done = [
    'done 1',
    'done 2',
  ];

  constructor(private dialog: MatDialog) { }

  ngOnInit() {
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

  onDailoIssue(){
    console.log("onDialog");
    const dialogRef = this.dialog.open(AddIssueComponent,{
      // height: '40%',
      width: '60%',
    })
    // .componentInstance.submitClicked.subscribe((project:Project)=>{
    //   console.log("from parent ",project);
    //   this.projects.push(6);
    // });
  }

}

@Component({
  selector: 'dialog-overview-signe-to',
  templateUrl: 'signed-to-dialog.html',
  styleUrls: ['../issue.component.css']
})
export class DialogOverviewSigneTo {
  myControl = new FormControl();
  options: string[] = ['One', 'Two', 'Three'];


  constructor(
    public dialogRef: MatDialogRef<DialogOverviewSigneTo>,
    @Inject(MAT_DIALOG_DATA) public data: string) {

    }

  onNoClick(): void {
    this.dialogRef.close();
  }

  /*on Click*/
  onSubmit(){
    console.log("onSubmit","this.issueform.value");

  }

}
