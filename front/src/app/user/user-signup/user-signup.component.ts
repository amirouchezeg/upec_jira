import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { UserService } from 'src/app/_service/user-service';
import { User } from 'src/app/_model/user';

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
  pathavatarFC: FormControl;
  createdateFC: FormControl;

  userform: FormGroup;
  
  constructor(
    private dialog: MatDialog,
    private fb: FormBuilder,
    private userService: UserService
    ) { }

  ngOnInit() {
    this.emailFC = new FormControl('');
    this.firstnameFC = new FormControl('');
    this.lastnameFC = new FormControl('');
    this.passwordFC = new FormControl('');
    this.createdateFC = new FormControl('');

    this.userform = this.fb.group({
      'email': this.emailFC,
      'firstname': this.firstnameFC,
      'lastname': this.lastnameFC,
      'password': this.passwordFC,
      'createdate': this.createdateFC    
    }) 
  }

  openDialogSignUp(): void {
    const dialogRef = this.dialog.open(UserSignupComponent, {
       width: '250px',
       height: '550px',
       data: {}
     });
  }

  onSubmit(){
    console.log(this.firstnameFC.value);    
    
    let user: User = new User();
    user.first_name = this.firstnameFC.value;
    user.last_name = this.lastnameFC.value;
    user.email = this.emailFC.value;
    user.password = this.passwordFC.value;
    user.create_date = new Date();
    console.log(user);
    this.userService.addUser(user).subscribe();
    
  }
}
