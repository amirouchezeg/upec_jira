import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import { Router } from '@angular/router';
import { UserSignupComponent } from '../user/user-signup/user-signup.component';
import { UserService } from '../_service/user-service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  // private dialogRef: any;
  isConnected:boolean;
  constructor(private userService:UserService,private dialog: MatDialog, private router: Router) { }

  ngOnInit() {
    this.isConnected=this.userService.isUserConnected();
  }

  Logout(){
    this.router.navigate(['/login']);
  }

  openDialogSignUp(): void {
   const dialogRef = this.dialog.open(UserSignupComponent, {
      width: '250px',
      height: '550px',
      data: {}
    });

    // this.dialogRef.afterClosed().subscribe(result => {
    //   console.log('The dialog was closed');
    //   // this.animal = result;
    // });
  }
  
  
}
