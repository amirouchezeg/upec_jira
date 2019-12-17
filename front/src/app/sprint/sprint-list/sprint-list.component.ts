import { Component, OnInit, ViewChild, TemplateRef  } from '@angular/core';
import { MatDialog, MatSnackBar } from '@angular/material';
import { SprintAddComponent } from '../sprint-add/sprint-add.component';
import { SprintService } from 'src/app/_service/sprint-service';
import { Sprint } from 'src/app/_model/sprint';
import { Router, ActivatedRoute } from '@angular/router';
import {MessageService} from 'primeng/api';
import { FormGroup, FormControl } from '@angular/forms';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-sprint-list',
  templateUrl: './sprint-list.component.html',
  styleUrls: ['../sprint.component.css'],
  providers: [MessageService]
})
export class SprintListComponent implements OnInit {

  @ViewChild('callAPIDialogDelete', {static: false}) callAPIDialogDelete: TemplateRef<any>;
  @ViewChild('callAPIDialogUpdate', {static: false}) callAPIDialogUpdate: TemplateRef<any>;
  sprintsInProgress : Sprint[] = [];
  sprintsToDo : Sprint[] = [];
  sprintsDone : Sprint[] = [];
  idProject : string;
  sprintform : FormGroup;
  ordreFC : FormControl;
  titleFC : FormControl;
  descriptionFC : FormControl;
  startDateFC : FormControl;
  endDateFC : FormControl;
  sprint : Sprint;
  sizeInProgress : number = 0;
  sizeToDo : number = 0;
  sizeDone : number = 0;
  currentDate = new Date();
  
  constructor(private _snackBar: MatSnackBar, private messageService: MessageService, private activeroute: ActivatedRoute, private route: Router, private sprintService:SprintService ,private dialog: MatDialog, public dialogDelete: MatDialog) { 
    this.sprintsInProgress = [];
    this.sprintsToDo = [];
    this.sprintsDone = [];
    this.sprint = new Sprint;
  }

  ngOnInit() {
    this.getAllSprint();
    this.activeroute.paramMap.subscribe (params => 
      {
        this.idProject = String(params.get("idProject"));
      } )
      this.ordreFC = new FormControl('');
      this.titleFC = new FormControl('');
      this.descriptionFC = new FormControl('');
      this.startDateFC = new FormControl('');
      this.endDateFC = new FormControl('');

      this.sprintform = new FormGroup({
        'ordre': this.ordreFC,
        'title': this.titleFC,
        'description': this.descriptionFC,
        'startDate': this.startDateFC,
        'endDate': this.endDateFC
      });
      
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
    this.sprintsInProgress = [];
    this.sprintsToDo = [];
    this.sprintsDone = [];
    this.sizeDone = 0;
    this.sizeInProgress = 0;
    this.sizeToDo = 0;
    this.sprintService.getAllSprint().subscribe( data => {
      console.log(data);
      this.sprintsToDo = [];
      
      let datas = (Object.values(data)[2]) as Sprint[];
      datas.forEach(element => {
        if(element.status == "toDo"){
          this.sprintsToDo.push(element);
          this.sizeToDo++;
        }
        if(element.status == "inProgress"){
          this.sprintsInProgress.push(element);
          this.sizeInProgress++;
        }
        if(element.status == "done"){
          this.sprintsDone.push(element);
          this.sizeDone++;
        }
      });        
    })
  }

  detailSprint(){
    this.route.navigateByUrl("/project/project_detail")
  }

  deleteSprint(id:number){
    let dialogRef = this.dialog.open(this.callAPIDialogDelete,{
      width: '60%',
      data: {idSprint: id}
    });
    dialogRef.afterClosed().subscribe(result => {
        if (result !== undefined) {
            if (result === 'yes') {
                this.sprintService.deleteSprint(id).subscribe(date=>{
                  this.getAllSprint();
                  this._snackBar.open("La suppression du sprint est effectuée avec succés","", {
                    verticalPosition: 'top',
                    duration: 2500,
                  })
                });
                
            }
        }
    })
  }

  
  updateSprint(id:string){
    this.sprintService.findById(id)
      .pipe(finalize(()=>{
        console.log(this.sprint)
        let dialogRef = this.dialog.open(this.callAPIDialogUpdate,{
          width: '60%',
          data: {idSprint: id}
        });
        dialogRef.afterClosed().subscribe(result => {
        if (result !== undefined) {
            if (result === 'yes') {
              let sprintUpdate= new Sprint;
              sprintUpdate._id = id;
              sprintUpdate.ordre = this.ordreFC.value;
              sprintUpdate.title = this.titleFC.value;
              sprintUpdate.description = this.descriptionFC.value;
              sprintUpdate.start_date = this.startDateFC.value;
              sprintUpdate.end_date = this.endDateFC.value;

              this.sprintService.update(sprintUpdate, id)
              .pipe(finalize(() => {
                this.getAllSprint();
                this._snackBar.open("La modification du sprint est effectuée avec succés","", {
                  verticalPosition: 'top',
                  duration: 2500,
                })
              }))
              .subscribe();
            }
        }
    })
      }))
      .subscribe(data => {
        this.sprint = (Object.values(data)[1]) as Sprint;

        this.ordreFC.setValue(this.sprint.ordre);
        this.titleFC.setValue(this.sprint.title);
        this.descriptionFC.setValue(this.sprint.description);
        this.startDateFC.setValue(this.sprint.start_date);
        this.endDateFC.setValue(this.sprint.end_date);
      })
    
  }

  clear() {
    this.messageService.clear();
  }

  getSprintById(id : string){
    this.sprintService.findById(id).subscribe(data => {
      console.log(data);
      this.sprint = (Object.values(data)[2]) as Sprint;
     
    })
  }


}
