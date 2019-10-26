import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';
import { ProjectAddComponent } from '../project-add/project-add.component';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.css']
})
export class ProjectListComponent implements OnInit {

  constructor(private dialog: MatDialog) { }

  ngOnInit() {
  }

  addProject(){
    const dialogRef = this.dialog.open(ProjectAddComponent);
  }
}

