import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddIssueComponent } from './add-issue/add-issue.component';
import { IssueScreenComponent } from './issue-screen/issue-screen.component';

//A modifier
import {MatFormFieldModule} from '@angular/material/form-field';
import {SharedModule} from '../_shared/shared.module';
import {MatInputModule} from '@angular/material/input';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IssueRoutingModule } from './issue-routing.module';
import { OneSprintComponent } from './one-sprint/one-sprint.component';

@NgModule({
  declarations: [
    AddIssueComponent, 
    IssueScreenComponent, 
    OneSprintComponent],
  imports: [
    IssueRoutingModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    SharedModule,
    MatInputModule,
    MDBBootstrapModule.forRoot(),
  ],
  providers: [  ],
  entryComponents: [AddIssueComponent]
})
export class IssueModule { }
