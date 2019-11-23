import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectRoutingModule } from './project-routing.module';
import { ProjectListComponent } from './project-list/project-list.component';
import { ProjectAddComponent } from './project-add/project-add.component';
import { ReactiveFormsModule} from '@angular/forms';

//A modifier
import {SharedModule} from '../_shared/shared.module';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { ProjectScreenComponent } from './project-screen/project-screen.component';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import { ProjectService } from '../_service/project-service';
import { ProjectDetailComponent } from './project-detail/project-detail.component';
import { SprintModule } from '../sprint/sprint.module';


// import { HeaderComponent } from '../header/header.component';
// import { FooterComponent } from '../footer/footer.component';

@NgModule({
  declarations: [
    // HeaderComponent,
    // FooterComponent,
    ProjectListComponent, 
    ProjectAddComponent, 
    ProjectScreenComponent, 
    ProjectDetailComponent],
  imports: [
    MatProgressBarModule,
    ReactiveFormsModule,
    CommonModule,
    ProjectRoutingModule,
    SharedModule,
    MatDatepickerModule,
    SprintModule
  ],
  providers: [
    MatDatepickerModule,
    ProjectService
  ],
  entryComponents: [ProjectListComponent,ProjectAddComponent]
})
export class ProjectModule { }
