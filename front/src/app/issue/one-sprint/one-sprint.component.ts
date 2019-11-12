import { Component, OnInit } from '@angular/core';
import { AddIssueComponent } from '../add-issue/add-issue.component';
import { MatDialog } from '@angular/material';


@Component({
  selector: 'app-one-sprint',
  templateUrl: './one-sprint.component.html',  
  styleUrls: ['../issue.component.css']
})
export class OneSprintComponent implements OnInit {

  constructor(private dialog: MatDialog) { }

  ngOnInit() {
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
