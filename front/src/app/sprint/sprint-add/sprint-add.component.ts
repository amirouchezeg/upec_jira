import { Component, OnInit, Output, EventEmitter, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { SprintService } from 'src/app/_service/sprint-service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Sprint } from 'src/app/_model/sprint';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-sprint-add',
  templateUrl: './sprint-add.component.html',
  styleUrls: ['../sprint.component.css']
})
export class SprintAddComponent implements OnInit {
  @Output() submitClicked = new EventEmitter<any>();
  sprintform: FormGroup;
  ordreFC: FormControl;
  titleFC: FormControl;
  descriptionFC: FormControl;
  startDateFC: FormControl;
  endDateFC: FormControl;
  idProject:  string;
  
  constructor( @Inject(MAT_DIALOG_DATA) private dialogData: any,private activeroute: ActivatedRoute ,private dialogRef:MatDialogRef<SprintAddComponent>, private sprintService: SprintService) { }

  ngOnInit() {
   
    this.idProject = this.dialogData['idProject'];

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

  onSubmit(){
    // this.isProgressVisible=true;
    
    // this.teamEmails.forEach(element => {
    //   this.teamEmailsTab.push({email: element, role: "test"})
    // });

    let sprint : Sprint = new Sprint;
    
    
    sprint.ordre = this.ordreFC.value;
    sprint.title = this.titleFC.value;
    sprint.description = this.descriptionFC.value;
   
    sprint.start_date = this.startDateFC.value;
    sprint.end_date = this.endDateFC.value;
    sprint.project_id = this.idProject;
  
    
    this.sprintService.addSprint(sprint).subscribe(data => {
      console.log("project added :" + data);

      //execute those to instructions after response of server 
    // this.isProgressVisible=false;    
    
    this.submitClicked.emit(sprint);
    this.dialogRef.close();
    })
  }

}
