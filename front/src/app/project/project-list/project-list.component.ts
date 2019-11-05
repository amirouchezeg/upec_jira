import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';
import { ProjectAddComponent } from '../project-add/project-add.component';
import { Project } from 'src/app/_model/project';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['../project.component.css']
})
export class ProjectListComponent implements OnInit {

  constructor(private dialog: MatDialog) { }
  projects = [1, 5, 7, 8];

  ngOnInit() {
  }

  addProject(){
    const dialogRef = this.dialog.open(ProjectAddComponent,{
      // height: '40%',
      width: '60%',
    }).componentInstance.submitClicked.subscribe((project:Project)=>{
      console.log("from parent ",project);
      this.projects.push(6);
    });

  }

}

