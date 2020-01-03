import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/_service/user-service';

@Component({
  selector: 'app-email-check',
  templateUrl: './email-check.component.html',
  styleUrls: ['./email-check.component.css']
})
export class EmailCheckComponent implements OnInit {
  token:String;
  stateChecking:String="checking";// checking , checked,error_checking

  constructor(private route: ActivatedRoute,private userService : UserService) {
    this.route.queryParams.subscribe(params => {
      this.token = params['token'];
      this.checkEmail();
    });
  }
  
  checkEmail(){
    this.userService.checkEmail(this.token).subscribe(data => {
      this.userService
      console.log('data',data);      
      this.stateChecking="checked";
    },error=>{
      console.log('error');
      this.stateChecking="error_checking";
    }); 
  }
  ngOnInit() {}

}
