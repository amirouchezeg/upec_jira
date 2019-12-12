import { Component, OnInit, ViewChild, TemplateRef  } from '@angular/core';
import { MatDialog } from '@angular/material';
import { SprintAddComponent } from '../sprint-add/sprint-add.component';
import { SprintService } from 'src/app/_service/sprint-service';
import { Sprint } from 'src/app/_model/sprint';
import { Router, ActivatedRoute } from '@angular/router';
import {MessageService} from 'primeng/api';

@Component({
  selector: 'app-sprint-list',
  templateUrl: './sprint-list.component.html',
  styleUrls: ['../sprint.component.css'],
  providers: [MessageService]
})
export class SprintListComponent implements OnInit {

  @ViewChild('callAPIDialog', {static: false}) callAPIDialog: TemplateRef<any>;
  sprintsInProgress : Sprint[] = [];
  sprintsToDo : Sprint[] = [];
  sprintsDone : Sprint[] = [];
  idProject: string;
  
  constructor(private messageService: MessageService, private activeroute: ActivatedRoute, private route: Router, private sprintService:SprintService ,private dialog: MatDialog, public dialogDelete: MatDialog) { 
    this.sprintsInProgress = [];
    this.sprintsToDo = [];
    this.sprintsDone = [];
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
    let currentDate = new Date();
    this.sprintService.getAllSprint().subscribe( data => {
      let datas = (Object.values(data)[2]) as Sprint[];
      datas.forEach(element => {
        if(element.status == "toDo"){
          this.sprintsInProgress.push(element);
        }
        if(element.status == "inProgress"){
          this.sprintsInProgress.push(element);
        }
        if(element.status == "done"){
          this.sprintsDone.push(element);
        }
      });        
    })
  }

  detailSprint(){
    this.route.navigateByUrl("/project/project_detail")
  }

  deleteSprint(id:number){
    let dialogRef = this.dialog.open(this.callAPIDialog,{
      width: '40%',
      data: {idSprint: id}
    });
        dialogRef.afterClosed().subscribe(result => {
            if (result !== undefined) {
                if (result === 'yes') {
                    this.sprintService.deleteSprint(id).subscribe();
                   
                    console.log('User clicked no.');
                }
            }
        })
  }

  updateSprint(){
    this.messageService.addAll([
      {key: 'tc', severity: 'success', summary: '30 Nov 2020', detail: 'La suppression du sprint est efféctuée avec succés'},
    ]);
  }

  clear() {
    this.messageService.clear();
  }

}
