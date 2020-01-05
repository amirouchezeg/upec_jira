import { Component, OnInit } from '@angular/core';
import { MatDialog, ErrorStateMatcher } from '@angular/material';
import { FormControl, FormGroup, FormBuilder, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { UserService } from 'src/app/_service/user-service';
import { User } from 'src/app/_model/user';
import { ViewEncapsulation } from '@angular/compiler/src/core';
import { UserSigninComponent } from '../user-signin/user-signin.component';
import { Router } from '@angular/router';
import { MyAlert } from 'src/app/_model/myAlert';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

export const EmailValidation = [Validators.required, Validators.email];

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const invalidCtrl = !!(control && control.invalid && control.parent.dirty);
    const invalidParent = !!(control && control.parent && control.parent.invalid && control.parent.dirty);

    return (invalidCtrl || invalidParent);
  }
}
export const PasswordValidation = [
  Validators.required,
  Validators.minLength(6)
];

@Component({
  selector: 'app-user-signup',
  templateUrl: './user-signup.component.html',
  styleUrls: ['../user.component.css']
})

export class UserSignupComponent implements OnInit {
  emailFC: FormControl;
  firstnameFC: FormControl;
  lastnameFC: FormControl;
  passwordFC: FormControl;
  confirmPassword: FormControl;
  pathavatarFC: FormControl;
  createdateFC: FormControl;
  userform: FormGroup;
  matcher = new MyErrorStateMatcher();
  alert:MyAlert;

  constructor(
    private dialog: MatDialog,
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router
    ) { }


  ngOnInit() {
    this.alert=new MyAlert('');
    this.emailFC = new FormControl('', EmailValidation);
    this.firstnameFC = new FormControl('');
    this.lastnameFC = new FormControl('');
    this.passwordFC = new FormControl('', PasswordValidation);
    this.createdateFC = new FormControl('');
    this.confirmPassword = new FormControl('');

    this.userform = this.fb.group({
      'email': this.emailFC,
      'firstname': this.firstnameFC,
      'lastname': this.lastnameFC,
      'password': this.passwordFC,
      'confirmPass': this.confirmPassword,
      'createdate': this.createdateFC    
    }, { validator: this.checkPasswords });
  }

  checkPasswords(group: FormGroup) { // here we have the 'passwords' group
    let pass = group.controls.password.value;
    let confirmPass = group.controls.confirmPass.value;
  
    return pass === confirmPass ? null : { notSame: true }
  }
  
  onSubmit(){
    this.alert.hide();
    let user: User = new User();
    user.first_name = this.firstnameFC.value;
    user.last_name = this.lastnameFC.value;
    user.email = this.emailFC.value;
    user.password = this.passwordFC.value;
   // user.create_date = new Date();
    console.log(user);
    this.userService.addUser(user).subscribe(
      data => {
        this.alert.message="	✅ Votre compte a été crée avec succés. Veuillez verifier votre email SVP";
        this.alert.showAlert("alert-success");
        console.log("data :"+ data);
      },error=>{
        console.log(error)
        this.alert.message=error.error.message;
        this.alert.showAlert("alert-danger");
      }
    );    
  }
  
}
