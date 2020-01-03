import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

export interface Lables {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-issue-detail',
  templateUrl: './issue-detail.component.html',
  styleUrls: ['./issue-detail.component.css']
})
export class IssueDetailComponent implements OnInit {

  lables: Lables[] = [
    {value: 'preview', viewValue: 'Bug'},
    {value: 'toDo', viewValue: 'Info'},
    {value: 'inProgress', viewValue: 'Review'},
    {value: 'finished', viewValue: 'Dev'},
  ];

  lableFC : FormControl;
  lableform: FormGroup;


  constructor() { }

  ngOnInit() {

    this.lableFC = new FormControl('');

    this.lableform = new FormGroup({
      'lable': this.lableFC,
    });
  }


  onSebmitComment(comment:string){
    console.log("comment",comment);
  }
  onAddLable(){
    console.log("lable",this.lableFC.value);

  }
  
}
