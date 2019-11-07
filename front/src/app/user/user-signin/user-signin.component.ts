import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserService } from 'src/app/_service/user-service';
import { Router } from '@angular/router';

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

  email: string;
  password: string;

  constructor(private userService : UserService,  private router: Router) { }

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
      
      localStorage.setItem('token', data.toString())
      console.log(data.valueOf());
      this.router.navigateByUrl('user/project_list');
    })
    
  }

  moveToSignUp(){
    this.router.navigateByUrl('/jira/User/signup');
  }
}
