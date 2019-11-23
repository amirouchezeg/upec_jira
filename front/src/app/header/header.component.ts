import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/_service/user-service';
import { MatDialog, MatSnackBar } from '@angular/material';
import { DialogProfileComponent } from './dialog-profile/dialog-profile.component';
import { DialogPasswordComponent } from './dialog-password/dialog-password.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  constructor() { }
  isConnected:boolean=false;
  message: any ="ToTest";

  constructor(private router:Router,private _snackBar: MatSnackBar,private userService: UserService,
    private dialog: MatDialog) {
    this.userService.getProfilList().subscribe(data => {
      if (data) {
          console.log("data from User",data) ;
          this.isConnected=true;
        } else {
          // clear messages when empty message received
          console.log("data from User is Empty") ;
      }
    });
  }
  
  ngOnInit() {
    if (localStorage.getItem('token')) {
      this.isConnected=true;      
    }
    
  }

  onFct(){
    
  }
  

  onDisconect(){
      this._snackBar.open("Vous vous êtes déconnecté","Se connecter", {
        verticalPosition: 'top',
        duration: 2500,
      }).onAction().subscribe(() => {
        this.router.navigateByUrl("/user/signin");
      });
    localStorage.removeItem('token');
    this.isConnected=false;
  }

  toTest(){
    
    // this.userService.changeMessage("true");

  }

  onDialogProfile(){
    console.log("onDialogProfile");
    this.dialog.open(DialogProfileComponent,{
      // height: '40%',
      width: '60%',
    })/*.componentInstance.submitClicked.subscribe((project:Project)=>{
      console.log("from parent ",project);
      this.projects.push(6);
    })*/;
  }

  onDialogPassword(){
    this.dialog.open(DialogPasswordComponent,{
      // height: '40%',
      width: '60%',
    });
  }

}
