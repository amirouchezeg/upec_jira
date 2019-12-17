import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { MatDialog, MatDialogRef, MatSnackBar } from '@angular/material';
import { ProjectAddComponent } from '../project-add/project-add.component';
import { Project } from 'src/app/_model/project';
import { ProjectService } from 'src/app/_service/project-service';
import { Router } from '@angular/router';
import { SprintListComponent } from 'src/app/sprint/sprint-list/sprint-list.component';
import { SprintModule } from 'src/app/sprint/sprint.module';
import { FormGroup, FormControl } from '@angular/forms';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['../project.component.css']
})
export class ProjectListComponent implements OnInit {
  projects : Project[] = [];
  @ViewChild('callAPIDialogDelete', {static: false}) callAPIDialogDelete: TemplateRef<any>;
  @ViewChild('callAPIDialogUpdate', {static: false}) callAPIDialogUpdate: TemplateRef<any>;
  
  titleFC : FormControl;
  startDateFC : FormControl;
  endDateFC : FormControl;
  descriptionFC : FormControl;

  teamEmails: string[] = [];
  projectform: FormGroup;  
  teamEmailsTab : Array<{email: string, role: string}> = [];
  
  constructor(private _snackBar: MatSnackBar, private route: Router, private dialog: MatDialog, private projectService: ProjectService) { 
    this.projects = [];
  }
 
  
  ngOnInit() {
    this.getAllProject();
    this.titleFC = new FormControl('');
    this.startDateFC = new FormControl('');
    this.endDateFC = new FormControl('');
    this.descriptionFC = new FormControl('');
    this.projectform = new FormGroup({
      'title': this.titleFC,
      'startDate': this.startDateFC,
      'endDate': this.endDateFC,
      'description': this.descriptionFC
    });
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

  deleteProject(id:number){
    let dialogRef = this.dialog.open(this.callAPIDialogDelete,{
      width: '60%',
      data: {idSprint: id}
    });
    dialogRef.afterClosed().subscribe(result => {
        if (result !== undefined) {
            if (result === 'yes') {
                this.projectService.deleteProject(id).subscribe(date=>{
                  this.getAllProject();
                  this._snackBar.open("La suppression du projet est effectuée avec succés","", {
                    verticalPosition: 'top',
                    duration: 2500,
                  })
                });
                
            }
        }
    })
  }
project : Project;
updateProject(id:string){
  this.projectService.findById(id)
    .pipe(finalize(()=>{
      console.log(this.project)
      let dialogRef = this.dialog.open(this.callAPIDialogUpdate,{
        width: '60%',
        data: {idProject: id}
      });
      dialogRef.afterClosed().subscribe(result => {
      if (result !== undefined) {
          if (result === 'yes') {
            let projectUpdate= new Project;
            projectUpdate._id = id;
            projectUpdate.title = this.titleFC.value;
            projectUpdate.description = this.descriptionFC.value;
            projectUpdate.start_date = this.startDateFC.value;
            projectUpdate.end_date = this.endDateFC.value;

            this.projectService.update(projectUpdate, id)
            .pipe(finalize(() => {
              this.getAllProject();
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
      this.project = (Object.values(data)[1]) as Project;

      this.titleFC.setValue(this.project.title);
      this.descriptionFC.setValue(this.project.description);
      this.startDateFC.setValue(this.project.start_date);
      this.endDateFC.setValue(this.project.end_date);
    })

  }
}

