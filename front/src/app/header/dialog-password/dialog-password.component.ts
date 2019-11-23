import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-dialog-password',
  templateUrl: './dialog-password.component.html',
  styleUrls: ['./dialog-password.component.css']
})
export class DialogPasswordComponent implements OnInit {


  old_passwordFC : FormControl;
  new_passwordFC : FormControl;
  new_password_confermFC : FormControl;
  passwordform: FormGroup;

  constructor() {
    this.old_passwordFC = new FormControl('');
    this.new_passwordFC = new FormControl('');
    this.new_password_confermFC = new FormControl('');
  
    this.passwordform = new FormGroup({
      'old_password': this.old_passwordFC,
      'new_password': this.new_passwordFC,
      'new_password_conferm': this.new_password_confermFC,
    });

  }

  ngOnInit() {
  }

}