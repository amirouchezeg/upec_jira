import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { SprintAddComponent } from '../sprint-add/sprint-add.component';
import { SprintService } from 'src/app/_service/sprint-service';
import { Sprint } from 'src/app/_model/sprint';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-sprint-list',
  templateUrl: './sprint-list.component.html',
  styleUrls: ['../sprint.component.css']
})
export class SprintListComponent implements OnInit {

  sprints : Sprint[] = [];
  idProject: string;

  constructor( private activeroute: ActivatedRoute, private route: Router, private sprintService:SprintService ,private dialog: MatDialog) { 
    this.sprints = [];
    
  }

  ngOnInit() {
    this.getAllSprint();
    this.activeroute.paramMap.subscribe (params => 
      {
        this.idProject = String(params.get("idProject"));
      } )
  
  }

  addSprint(){
    const dialogRef = this.dialog.open(SprintAddComponent,{
      // height: '40%',
      width: '60%',
      data: {idProject: this.idProject}
    }).componentInstance.submitClicked.subscribe((project:Sprint)=>{
      this.getAllSprint();
    });
  }

  getAllSprint(){
    this.sprintService.getAllSprint().subscribe( data => {
        let dataList = (Object.values(data)[2]) as Sprint[];
        // dataList.forEach(element => {
        //   if((element.description).length>30){
        //     element.description = (element.description).substr(0,30) + "..."
        //   }
        // });
        this.sprints = dataList;
      })
  }

  detailSprint(){
    this.route.navigateByUrl("/project/project_detail")
  }
}
