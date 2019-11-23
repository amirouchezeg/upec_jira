import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { MatChipInputEvent } from '@angular/material'; 

@Component({
  selector: 'app-add-issue',
  templateUrl: './add-issue.component.html',
  styleUrls: ['../issue.component.css']
})
export class AddIssueComponent implements OnInit {
  isProgressVisible:boolean=false;

// todo :sprint_id: 
// create_date
// users
  titleOfDailogBox :string
  teamEmails: string[] = [];
  titleFC : FormControl;
  descriptionFC : FormControl;
  start_dateFC : FormControl;
  end_dateFC : FormControl;
  statusFC : FormControl;
  create_dateFC : FormControl;
  issueform: FormGroup;  
  
  constructor() {
    this.titleOfDailogBox="Ajouter Une Tâche";
  }
  
  ngOnInit() {
    this.titleFC = new FormControl('');
    this.descriptionFC = new FormControl('');
    this.start_dateFC = new FormControl('');
    this.end_dateFC = new FormControl('');
    this.statusFC = new FormControl('');
    this.create_dateFC = new FormControl('');

    this.issueform = new FormGroup({
      'title': this.titleFC,
      'description': this.descriptionFC,
      'start_date': this.start_dateFC,
      'end_date': this.end_dateFC,
      'status': this.statusFC,
      'create_date': this.create_dateFC,
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
    console.log("onSubmit",this.issueform.value);

  }
}
