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
    private userService: UserService
    ) {   }

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
    // console.log("2",this.nomFC.value);    
    // console.log(this.prenomFC.value);
    // console.log(this.roleFC.value);
    console.log("---------------send post signup");
    let user: User={
      email:"ami@gmail.com",
      password:"azerty",
      first_name:"ami",
      last_name:"zeg",
    };
    this.userService.signUpUser(user)//getting the currant freelancer to display the price in addPost
      .subscribe(
        data => {
          console.log('data user signup',data);
          var jsonData=  JSON.parse(JSON.stringify(data));                       
        },
        error => {console.log("front errors :", JSON.stringify(error.error));});
    
  }

  onLogin(){
    console.log("onLogin()");
  }
}
