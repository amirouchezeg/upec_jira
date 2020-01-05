import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { UserSigninComponent } from './user-signin/user-signin.component';
import { UserSignupComponent } from './user-signup/user-signup.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

//A modifier
import {MatFormFieldModule} from '@angular/material/form-field';
import {SharedModule} from '../_shared/shared.module';
import {MatInputModule} from '@angular/material/input';
import { UserScreenComponent } from './user-screen/user-screen.component';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { UserService } from '../_service/user-service';
import { ProjectModule } from '../project/project.module';
import { EmailCheckComponent } from './email-check/email-check.component';

@NgModule({
  declarations: [UserSigninComponent, UserSignupComponent, UserScreenComponent, EmailCheckComponent],
  imports: [
    CommonModule,
    UserRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    SharedModule,
    MatInputModule,
    MDBBootstrapModule.forRoot(),
    ProjectModule
  ],
  providers: [ UserService ],
  entryComponents: [UserSigninComponent]
})
export class UserModule { }
