import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/_service/user-service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  isConnected:boolean=true;
  message: any ="ToTest";
  constructor(private userService: UserService) {
  }
  
  ngOnInit() {
    if (localStorage.getItem('token')) {
      this.isConnected=true;      
    }
    this.userService.currentMessage.subscribe(message => {
      console.log("Header page ", message)
      this.isConnected= message=="true"} 
    );
  }
  
  onDisconect(){
    localStorage.removeItem('token');
    this.isConnected=false;
  }

  toTest(){
    
    this.userService.changeMessage("true");

  }

}
