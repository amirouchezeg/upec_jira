import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { UserService } from 'src/app/_service/user-service';
import { MyAlert } from 'src/app/_model/myAlert';
import { Alert } from 'selenium-webdriver';
import { User } from 'src/app/_model/user';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-dialog-profile',
  templateUrl: './dialog-profile.component.html',
  styleUrls: ['./dialog-profile.component.css']
})
export class DialogProfileComponent implements OnInit {
  
  firstNameFC : FormControl;
  lastNameFC : FormControl;
  profileform: FormGroup;
  alert:MyAlert;
  showEmail:boolean=false;
  user:User;

  constructor(private userService:UserService,private _snackBar: MatSnackBar) {
    this.alert=new MyAlert("");
  }
  
  ngOnInit() {
    
    this.getUser();
    
    this.firstNameFC = new FormControl('');
    this.lastNameFC = new FormControl('');
    this.profileform = new FormGroup({
      'first_name': this.firstNameFC,
      'last_name': this.lastNameFC,
    });
  }

  onSubmit(){
    this.userService.update(this.profileform.value).subscribe(
      data => {
        this.toast("L'operation a effectué avec succès",'bg-success');
        console.log("data",data)
      },error=>{
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

  onResend(){
    this.userService.resendEmailCheck().subscribe(
      data => {
        this._snackBar.open("Email envoyé .Merci de vérifier votre Email","", {
          verticalPosition: 'top',
          panelClass: ['bg-success'],
          duration: 2900,
        });
      },error=>{
        console.log('error');
    });
  }

  getUser(){
    this.userService.getUser().subscribe(data => {
      var jsonData=  JSON.parse(JSON.stringify(data));                       
      this.user =JSON.parse(JSON.stringify(jsonData.data));

      if(!this.user.email_confirme){
        this.alert.message="Votre email n'est pas vérifier";
        this.alert.showAlert('alert-danger');
      }
      this.lastNameFC.setValue(this.user.last_name); 
      this.firstNameFC.setValue(this.user.first_name);
      this.showEmail=true;
    },error=>{
      console.log('error');
    });
  }
}
