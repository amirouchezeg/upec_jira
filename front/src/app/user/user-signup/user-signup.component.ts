import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { UserService } from 'src/app/_service/user-service';
import { User } from 'src/app/_model/user';

@Component({
  selector: 'app-user-signup',
  templateUrl: './user-signup.component.html',
  styleUrls: ['./user-signup.component.css']
})
export class UserSignupComponent implements OnInit {
  userform: FormGroup;
  nomFC: FormControl;
  prenomFC: FormControl;
  roleFC: FormControl;
//...........
  constructor(
    private dialog: MatDialog,
    private fb: FormBuilder,
    // private userService: UserService
    ) { 

    }

  ngOnInit() {
    this.nomFC = new FormControl('');
    this.prenomFC = new FormControl('');
    this.roleFC = new FormControl('');
    this.userform = this.fb.group({
      'nom': this.nomFC,
      'prenom': this.prenomFC,
      'role': this.roleFC
      //...........
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
    console.log(this.nomFC.value);    
    console.log(this.prenomFC.value);
    console.log(this.roleFC.value);
    let user: User;
    // this.userService.signUpUser(user).subscribe()
    
  }
}
