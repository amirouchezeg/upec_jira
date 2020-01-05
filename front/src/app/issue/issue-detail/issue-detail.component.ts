import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { Issues } from 'src/app/_model/issues';
import { Auth } from 'src/app/_service/auth';
import { IssuesService } from 'src/app/_service/issues-service';
import { Comments } from 'src/app/_model/comments';

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
    {value: 'Bug', viewValue: 'Bug'},
    {value: 'Prioritaire', viewValue: 'Prioritaire'},
    {value: 'Bloquant', viewValue: 'Bloquant'},
    {value: 'Amelioration', viewValue: 'Amelioration'},
  ];

  lableFC : FormControl;
  lableform: FormGroup;
  issue:Issues;
  statusIssue:string;
  auth:Auth;


  constructor(@Inject(MAT_DIALOG_DATA) public data: string,private issuesService:IssuesService,private _snackBar: MatSnackBar) {
    var jsonData= JSON.parse(JSON.stringify(data)); 
    this.issue=jsonData.issue as Issues;
    console.log("issue",this.issue);

    //get the issue from db
    this.getIssue(this.issue._id);

    //translate status to fr
    let s=this.issue.status;
    this.statusIssue=(s=='preview') ? "A Faire" :(s=='toDo')?"Ouvert":(s=='inProgress')?"En Cours":"Terminé";

    //get email of current user
    this.auth=Auth.getInstance();
  }

  ngOnInit() {

    this.lableFC = new FormControl('');

    this.lableform = new FormGroup({
      'lable': this.lableFC,
    });
  }

  getIssue(_id:string){
    this.issuesService.getIssue(_id).subscribe( 
      data => {
        console.log("data ",data);
        var jsonData= JSON.parse(JSON.stringify(data)); 
        this.issue= JSON.parse(JSON.stringify(jsonData.data)) as Issues;
      },
      error => { 
        console.log("error",error);
        this.toast("L'opération a échoué",'bg-danger');
    });
  }



  onSebmitComment(comment:string){
    console.log("comment",comment);
    let objComment:Comments  ={
      message:comment,
      email:this.auth.email,
      issue_id:this.issue._id,
    }
    this.issuesService.addComment(objComment).subscribe( 
      data => {
        console.log("data ",data);
        objComment.commentaire=comment;
        this.issue.comments.push(objComment);
      },
      error => { 
        console.log("error",error);
        this.toast("L'opération a échoué",'bg-danger');
      });

  }

  onDeleteCommnet(commnet:Comments){
    this.issuesService.deleteComment(commnet._id,this.issue._id).subscribe( 
      data => {
        console.log("data ",data);
        this.issue.comments = this.issue.comments.filter(obj => obj._id != commnet._id);
      },
      error => { 
        console.log("error",error);
        this.toast("L'opération a échoué",'bg-danger');
      });
  }

  onAddLable(){
    if (this.lableFC.value=="") 
      return

    this.issue.labels.push(this.lableFC.value);
    let mIssue:Issues={
      _id:this.issue._id,
      labels:this.issue.labels
    }
    this.editLable(mIssue);
    
  }

  deleteLabel(item:string){
    const index = this.issue.labels.indexOf(item);
    if (index > -1) {
      this.issue.labels.splice(index, 1);
    }
    let mIssue:Issues={
      _id:this.issue._id,
      labels:this.issue.labels
    }
    this.editLable(mIssue);
  }

  editLable(mIssue:Issues){
    console.log("labels",this.issue.labels)
    this.issuesService.editIssue(this.issue._id,mIssue).subscribe( 
      data => {
        console.log("data ",data);
        var jsonData= JSON.parse(JSON.stringify(data)); 
        this.issue= JSON.parse(JSON.stringify(jsonData.data)) as Issues;
      },
      error => { 
        console.log("error",error);
        this.toast("L'opération a échoué",'bg-danger');
    });
  }
  toast(message:string,css_class:string="",time:number=2900){
    this._snackBar.open(message,"", {
      verticalPosition:'top',
      panelClass: [css_class],
      duration: time,
    });
  }
  
}
