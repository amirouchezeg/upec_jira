import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-dialog-profile',
  templateUrl: './dialog-profile.component.html',
  styleUrls: ['./dialog-profile.component.css']
})
export class DialogProfileComponent implements OnInit {

  
  firstNameFC : FormControl;
  lastNameFC : FormControl;
  profileform: FormGroup;

  constructor() {

  }
  
  ngOnInit() {
    this.firstNameFC = new FormControl('');
    this.lastNameFC = new FormControl('');
  
    this.profileform = new FormGroup({
      'firstName': this.firstNameFC,
      'lastName': this.lastNameFC,
    });
  }

  onSubmit(){

  }
}
