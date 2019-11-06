import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {MatChipInputEvent} from '@angular/material/chips';
import { FormControl, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { Project } from 'src/app/_model/project';


@Component({
  selector: 'app-project-add',
  templateUrl: './project-add.component.html',
  styleUrls: ['../project.component.css']
})
export class ProjectAddComponent implements OnInit {
  @Output() submitClicked = new EventEmitter<any>();
  isProgressVisible = false;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  title = new FormControl('',[Validators.minLength(2),Validators.required]);
  startDate = new FormControl('');
  endDate = new FormControl('');
  description = new FormControl('');
  teamEmails: string[] = [];
  

  constructor(private dialogRef:MatDialogRef<ProjectAddComponent>) { }

  ngOnInit() {
  }

  /* add remove user from team */
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
  onSaveProject(){
    this.isProgressVisible=true;
    let project:Project = new Project(this.title.value,this.description.value,this.startDate.value,this.endDate.value,this.teamEmails);
    //checkValidation
    if (!project.isValide()) {      
      console.log('not Valide: ',project);
      return;
    }
    console.log('project: ',project);

    
    //execute those to instructions after response of server 
    this.isProgressVisible=false;    
    const data = 'Your data';
    this.submitClicked.emit(project);
    this.dialogRef.close();
    
  }
}