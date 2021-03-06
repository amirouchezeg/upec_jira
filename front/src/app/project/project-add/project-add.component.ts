import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {MatChipInputEvent} from '@angular/material/chips';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { Project } from 'src/app/_model/project';
import { ProjectService } from 'src/app/_service/project-service';
import { Auth } from 'src/app/_service/auth';


@Component({
  selector: 'app-project-add',
  templateUrl: './project-add.component.html',
  styleUrls: ['../project.component.css']
})
export class ProjectAddComponent implements OnInit {
  @Output() submitClicked = new EventEmitter<any>();
  isProgressVisible = false;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];

  titleFC : FormControl;
  startDateFC : FormControl;
  endDateFC : FormControl;
  descriptionFC : FormControl;
  auth:Auth;
  teamEmails: string[] = [];
  projectform: FormGroup;  
  teamEmailsTab : Array<{email: string, role: string}> = [];

  constructor(private dialogRef:MatDialogRef<ProjectAddComponent>, private projectService: ProjectService) { }

  ngOnInit() {
    this.auth=Auth.getInstance(); 
    this.titleFC = new FormControl('',Validators.required);
    this.startDateFC = new FormControl('',);
    this.endDateFC = new FormControl('',);
    this.descriptionFC = new FormControl('',);

    this.projectform = new FormGroup({
      'title': this.titleFC,
      'startDate': this.startDateFC,
      'endDate': this.endDateFC,
      'description': this.descriptionFC
    });
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

  /*on Click*/
  onSubmit(){
    this.isProgressVisible=true;
    // this.teamEmails.forEach(element => {
    // });
    this.teamEmailsTab=[];
    this.teamEmailsTab.push({email: this.auth.email, role: "Chef de projet"})

    let project : Project = new Project;

    project.title = this.titleFC.value;
    project.end_date = this.endDateFC.value;
    project.start_date = this.startDateFC.value;
    project.description = this.descriptionFC.value;
    project.users = this.teamEmailsTab;
    
    this.projectService.addProject(project).subscribe(data => {
      console.log("data project",data);
        //execute those to instructions after response of server 
      this.isProgressVisible=false;    
      
      this.submitClicked.emit(project);
      this.dialogRef.close();
    })
    console.log('project: ',project);
    
  }
}