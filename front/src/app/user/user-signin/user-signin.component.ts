import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserService } from 'src/app/_service/user-service';
import { Router } from '@angular/router';
import { MyAlert } from '../../_model/myAlert'
import { HeaderComponent } from 'src/app/header/header.component';


export const EmailValidation = [Validators.required, Validators.email];
@Component({
  selector: 'app-user-signin',
  templateUrl: './user-signin.component.html',
  styleUrls: ['../user.component.css']
})
export class UserSigninComponent implements OnInit {
  userform: FormGroup;
  emailFC: FormControl;
  passwordFC: FormControl;
  myAlert: MyAlert;
  email: string;
  password: string;
  header:HeaderComponent;

  constructor(private userService : UserService,  private router: Router) {
    this.myAlert=new MyAlert("","");
   }

  ngOnInit() {
    this.emailFC = new FormControl('', EmailValidation);
    this.passwordFC = new FormControl('');

    this.userform = new FormGroup({
      'email': this.emailFC,
      'password': this.passwordFC
    });

  }

  onSubmit(){

    this.email = this.emailFC.value;
    this.password = this.passwordFC.value;
    this.userService.login(this.email, this.password).subscribe(data => {
      localStorage.setItem('token', JSON.stringify(data));
      console.log("data:",data);
      this.router.navigate(['user/project_list'])
      .then(() => {
        window.location.reload();
      });
    },error=>{
      this.myAlert.message=error.error.message;
      this.myAlert.showAlert("alert-danger");
      console.log('error:',this.myAlert.message);
    }); 
  }

  onKey(event: any) {
    this.myAlert.hide();
  }
}

