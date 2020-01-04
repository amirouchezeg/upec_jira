import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { MatDialog, MatDialogRef, MatSnackBar, MatChipInputEvent, MAT_DATEPICKER_VALIDATORS } from '@angular/material';
import { ProjectAddComponent } from '../project-add/project-add.component';
import { Project } from 'src/app/_model/project';
import { ProjectService } from 'src/app/_service/project-service';
import { Router } from '@angular/router';
import { SprintListComponent } from 'src/app/sprint/sprint-list/sprint-list.component';
import { SprintModule } from 'src/app/sprint/sprint.module';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { finalize } from 'rxjs/operators';
import { ENTER, COMMA } from '@angular/cdk/keycodes';
import { EmailValidation } from 'src/app/user/user-signin/user-signin.component';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['../project.component.css']
})
export class ProjectListComponent implements OnInit {
  projects : Project[] = [];
  @ViewChild('callAPIDialogDelete', {static: false}) callAPIDialogDelete: TemplateRef<any>;
  @ViewChild('callAPIDialogUpdate', {static: false}) callAPIDialogUpdate: TemplateRef<any>;
  @ViewChild('callAPIDialogMembers', {static: false}) callAPIDialogMembers: TemplateRef<any>;
  titleFC : FormControl;
  startDateFC : FormControl;
  endDateFC : FormControl;
  descriptionFC : FormControl;
  teamEmails: string[] = [];
  projectform: FormGroup;  
  teamEmailsTab : Array<{id:number, email: string, role: string}> = [];
  idProjectToUpdate : string;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  project : Project;
  dialogRefUpdate : any;
  tableColumns = [
    { field: 'delete', header: 'Action' },
    { field: 'email', header: 'Email' },
    { field: 'role', header: 'Role' }
  ];
  roles = [
    { role : 'Développeur'},
    { role : 'Chef de projet'}
  ]

  errorMessage : string;

  constructor( private _snackBar: MatSnackBar, private route: Router, private dialog: MatDialog, private projectService: ProjectService) { 
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

    /* add remove email from inpute in html */
    add(event: MatChipInputEvent): void {
      const input = event.input;
      const value = event.value;
  
      // Add our fruit
      if ((value || '').trim()) {
        this.teamEmails.push( value.trim());
      }
  
      // Reset the input value
      if (input) {
        input.value = '';
      }
    }
  
    remove(fruit: string): void {
      const index = this.teamEmails.indexOf(fruit);
  
      if (index >= 0) {
        this.teamEmails.splice(index, 1);
      }
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

titlePrject:string;
  updateProject(id:string){
    this.titlePrject = "";
    this.projectService.findById(id)
      .pipe(finalize(()=>{
         this.dialogRefUpdate = this.dialog.open(this.callAPIDialogUpdate,{
          width: '60%',
          data: {idProject: id}
        });
      }))
      .subscribe(data => {
        this.project = (Object.values(data)[1]) as Project;
        this.teamEmails = [];
        this.titlePrject = this.project.title;
        this.titleFC.setValue(this.project.title);
        this.descriptionFC.setValue(this.project.description);
        this.startDateFC.setValue(this.project.start_date);
        this.endDateFC.setValue(this.project.end_date);
        this.project.users.forEach(element => {
          this.teamEmailsTab.push({id:element._id, email: element.email, role: element.role})
        });
      })
    }

  onSubmit(){
    let project : Project = new Project();
    project.title = this.titleFC.value;
    project.start_date = this.startDateFC.value;
    project.end_date = this.endDateFC.value;
    project.description = this.descriptionFC.value;
    // this.teamEmails.forEach(element => {
    //   this.teamEmailsTab.push({email: element, role: "test"})
    // });
    // project.users = this.teamEmailsTab;
    this.projectService.update(project, this.project._id).subscribe( data => {
      this.dialogRefUpdate.close();
      this.getAllProject();
      this._snackBar.open("La modification du sprint est effectuée avec succés","", {
        verticalPosition: 'top',
        duration: 2500,
      })
    });
  }

  

  addMembers(id:string){
    this.idProjectToUpdate = id;
    this.titlePrject = "";
    this.teamEmailsTab = [];
    this.projectService.findById(this.idProjectToUpdate)
    .pipe(finalize(()=>{
      this.dialogRefUpdate = this.dialog.open(this.callAPIDialogMembers,{
        width: '60%'
      });
    }))
    .subscribe(data => {
      this.project = (Object.values(data)[1]) as Project;
     this.teamEmails = [];
      this.titleFC.setValue(this.project.title);
      this.titlePrject = this.project.title;
      this.descriptionFC.setValue(this.project.description);
      this.startDateFC.setValue(this.project.start_date);
      this.endDateFC.setValue(this.project.end_date);
      this.project.users.forEach(element => {
        this.teamEmailsTab.push({id:element._id, email: element.email, role: element.role})
      });
    })
  }

  addNewRow(){
    this.teamEmailsTab.push({
      id: this.teamEmailsTab.length+1,
      email: '',
      role: ''
      })
  }

  deleteRow;
  deleteTableRow(row){
    this.deleteRow = this.teamEmailsTab.indexOf(row);
    this.teamEmailsTab.splice(this.deleteRow,1);
  }

  onSubmitMember(){
    let index : number = 0;
    
    this.teamEmailsTab = this.teamEmailsTab.filter(x => x.email!= "");
    
    this.project.users = this.teamEmailsTab;
    this.projectService.update(this.project, this.idProjectToUpdate)
    .subscribe(data=>{
      this.dialogRefUpdate.close();
      this._snackBar.open("L'affectation des membres au projet est effectuée avec succés","", {
        verticalPosition: 'top',
        duration: 2500,
      })
    }, error => {
      this.errorMessage = "";
      this.errorMessage = error;
    })
    
  }
invalidEmail: string;
idEmail: number;
  saverange(id : number, event){
   let regexp = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
    if(!regexp.test(event)){
      this.invalidEmail = "Email invalid";
      this.idEmail = id;
    } else {
      this.invalidEmail ="";
    }
    this.teamEmailsTab.forEach(element => {
      if(element.id === id){
        element.email = event;
      }
    });
  }
}

