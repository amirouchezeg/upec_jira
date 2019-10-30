import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-user-signin',
  templateUrl: './user-signin.component.html',
  styleUrls: ['../user.component.css']
})
export class UserSigninComponent implements OnInit {
  userForm: FormGroup;

  constructor() { }

  ngOnInit() {
    this.userForm = new FormGroup({
      nom: new FormControl('', Validators.required),
      prenom: new FormControl('', Validators.required),
    });
  }

}
