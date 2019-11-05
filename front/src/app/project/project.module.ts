import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProjectRoutingModule } from './project-routing.module';
import { ProjectListComponent } from './project-list/project-list.component';
import { ProjectAddComponent } from './project-add/project-add.component';



//A modifier
import {SharedModule} from '../_shared/shared.module';
import {MatDatepickerModule} from '@angular/material/datepicker';

@NgModule({
  declarations: [ProjectListComponent, ProjectAddComponent],
  imports: [
    CommonModule,
    ProjectRoutingModule,



    SharedModule,
    MatDatepickerModule
  ],
  providers: [
    MatDatepickerModule
  ],
  entryComponents: [ProjectAddComponent, ProjectListComponent]
})
export class ProjectModule { }
