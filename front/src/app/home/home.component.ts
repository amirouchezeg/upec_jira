import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog} from '@angular/material';
import { Router } from '@angular/router';
import { SignInComponent } from '../user/sign-in/sign-in.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  private dialogRef: any;

  constructor(private dialog: MatDialog, private router: Router) { }

  ngOnInit() {
  }

  Logout(){
    this.router.navigate(['/login']);
  }

 

  openDialogSignUp(): void {
    this.dialogRef = this.dialog.open(SignInComponent, {
      width: '250px',
      data: {}
    });

    this.dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      // this.animal = result;
    });
  }
  
  
}
