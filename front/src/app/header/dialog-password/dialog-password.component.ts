import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { UserService } from 'src/app/_service/user-service';
import { MatSnackBar, MatDialogRef } from '@angular/material';
import { MyAlert } from 'src/app/_model/myAlert';

@Component({
  selector: 'app-dialog-password',
  templateUrl: './dialog-password.component.html',
  styleUrls: ['./dialog-password.component.css']
})
export class DialogPasswordComponent implements OnInit {

  alert:MyAlert;
  old_passwordFC : FormControl;
  new_passwordFC : FormControl;
  new_password_confermFC : FormControl;
  passwordform: FormGroup;

  constructor(public dialogRef: MatDialogRef<DialogPasswordComponent>,private userService:UserService,private _snackBar: MatSnackBar) {
    this.old_passwordFC = new FormControl('');
    this.new_passwordFC = new FormControl('');
    this.new_password_confermFC = new FormControl('');
    this.alert=new MyAlert("");
    this.passwordform = new FormGroup({
      'old_password': this.old_passwordFC,
      'new_password': this.new_passwordFC,
      'confirmed': this.new_password_confermFC,
    });

  }

  ngOnInit() {}

  onSubmit(){
    this.alert.hide();
    this.userService.updatePassword(this.passwordform.value).subscribe(
      data => {
        this.toast("L'operation a effectué avec succès",'bg-success');
        console.log("data",data);
        this.dialogRef.close();
      },error=>{
        var jsonData=  JSON.parse(JSON.stringify(error));                       
        // let errorPassword =JSON.parse(JSON.stringify(jsonData));
        console.log("error-- ",error);
        this.alert.message=jsonData.error.message;
        this.alert.showAlert();
        // this.old_passwordFC.valid
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