import { Component, OnInit, Inject } from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { MatChipInputEvent, MAT_DIALOG_DATA } from '@angular/material'; 
import { IssuesService } from 'src/app/_service/issues-service';
import { Issues } from 'src/app/_model/issues';

@Component({
  selector: 'app-add-issue',
  templateUrl: './add-issue.component.html',
  styleUrls: ['../issue.component.css']
})
export class AddIssueComponent implements OnInit {
  emails=["email1@gmail.com","email2@gmail.com"];

  isProgressVisible:boolean=false;
  sprintId :string;
  titleOfDailogBox :string;
  teamEmails: string[] = [];
  titleFC : FormControl;
  descriptionFC : FormControl;
  start_dateFC : FormControl;
  end_dateFC : FormControl;
  statusFC : FormControl;
  emailUserFC : FormControl;
  sprint_idFC : FormControl;
  issueform: FormGroup;
  issue:Issues;
  isAddAction:boolean;

  constructor(@Inject(MAT_DIALOG_DATA) public data: string, private issuesService:IssuesService) {
    var jsonData= JSON.parse(JSON.stringify(data));
    this.isAddAction=jsonData.data.type=='add'?true:false;                       
    if (this.isAddAction) {
      this.titleOfDailogBox="Ajouter Une Tâche";
      this.sprintId =JSON.parse(JSON.stringify(jsonData.data.type));
    } else {
      this.titleOfDailogBox="Modifie La Tâche";
      this.issue=jsonData.data.issue;
    }
    //get the sprint id sended from page of sprint
  }
  
  ngOnInit() {
    this.titleFC = new FormControl(this.issue? this.issue.title: '');
    this.descriptionFC = new FormControl(this.issue? this.issue.description: '');
    this.start_dateFC = new FormControl(this.issue? this.issue.start_date: '');
    this.end_dateFC = new FormControl(this.issue? this.issue.end_date: '');
    this.statusFC = new FormControl(this.issue? this.issue.status: '');
    this.emailUserFC = new FormControl(this.issue? this.issue.users/*.email*/: '');
    this.sprint_idFC = new FormControl(this.issue? this.issue.sprint_id: this.sprintId);

    this.issueform = new FormGroup({
      'title': this.titleFC,
      'description': this.descriptionFC,
      'start_date': this.start_dateFC,
      'end_date': this.end_dateFC,
      'status': this.statusFC,
      'userEmail': this.emailUserFC,
      'sprint_id': this.sprint_idFC,
      // 'create_date': this.create_dateFC,
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
    this.issuesService.addIssue(this.issueform.value).subscribe( data => {
      console.log("add issue",data);
      var jsonData=  JSON.parse(JSON.stringify(data));                       
      let issue =JSON.parse(JSON.stringify(jsonData.data)); 
    });
  }

}
