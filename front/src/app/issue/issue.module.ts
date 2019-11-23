import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddIssueComponent } from './add-issue/add-issue.component';
import { IssueScreenComponent } from './issue-screen/issue-screen.component';

//A modifier
import {MatFormFieldModule} from '@angular/material/form-field';
import {SharedModule} from '../_shared/shared.module';
import {MatDialogModule} from '@angular/material/dialog';
import {DragDropModule} from '@angular/cdk/drag-drop';
import {MatInputModule} from '@angular/material/input';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IssueRoutingModule } from './issue-routing.module';
import { OneSprintComponent, DialogOverviewSigneTo } from './one-sprint/one-sprint.component';
import {MatAutocompleteModule} from '@angular/material/autocomplete';

@NgModule({
  declarations: [
    AddIssueComponent, 
    DialogOverviewSigneTo,
    IssueScreenComponent, 
    OneSprintComponent],
  imports: [
    IssueRoutingModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    DragDropModule,
    SharedModule,
    MatAutocompleteModule,
    MatDialogModule,
    MatInputModule,
    MDBBootstrapModule.forRoot(),
  ],
  providers: [  ],
  entryComponents: [AddIssueComponent,DialogOverviewSigneTo]
})
export class IssueModule { }
