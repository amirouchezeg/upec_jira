import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';
import { ProjectAddComponent } from '../project-add/project-add.component';
import { Project } from 'src/app/_model/project';
import { ProjectService } from 'src/app/_service/project-service';
import { Router } from '@angular/router';
import { SprintListComponent } from 'src/app/sprint/sprint-list/sprint-list.component';
import { SprintModule } from 'src/app/sprint/sprint.module';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['../project.component.css']
})
export class ProjectListComponent implements OnInit {
  projects : Project[] = [];
  constructor(private route: Router, private dialog: MatDialog, private projectService: ProjectService) { 
    this.projects = [];
  }
 
  
  ngOnInit() {
    this.getAllProject();
  }

  getAllProject(){
    this.projectService.getAllProject().subscribe( data => {
        let dataList = (Object.values(data)[2]) as Project[];
        dataList.forEach(element => {
          if((element.description).length>30){
            element.description = (element.description).substr(0,30) + "..."
          }
        });
        this.projects = dataList;

      })
  }

  addProject(){
    const dialogRef = this.dialog.open(ProjectAddComponent,{
      // height: '40%',
      width: '60%',
    }).componentInstance.submitClicked.subscribe((project:Project)=>{
      this.getAllProject();
    });

  }

  detailProject(idProject: string){
    console.log(idProject);

    this.route.navigateByUrl("/project/project_detail/"+idProject);
  }

}

