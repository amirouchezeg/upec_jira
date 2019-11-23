import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SprintRoutingModule } from './sprint-routing.module';
import { SprintListComponent } from './sprint-list/sprint-list.component';
import { SprintAddComponent } from './sprint-add/sprint-add.component';
import { SprintDetailComponent } from './sprint-detail/sprint-detail.component';
import { SprintScreenComponent } from './sprint-screen/sprint-screen.component';
import { SprintService } from '../_service/sprint-service';
import { SharedModule } from '../_shared/shared.module';
import { MatProgressBarModule, MatDatepickerModule } from '@angular/material';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [SprintListComponent, SprintAddComponent, SprintDetailComponent, SprintScreenComponent],
  imports: [
    CommonModule,
    SprintRoutingModule,
    SharedModule,
    MatProgressBarModule,
    ReactiveFormsModule,
    CommonModule,
    SprintRoutingModule,    
    MatDatepickerModule
  ],
  providers: [
    // MatDatepickerModule,
    SprintService
  ],
  entryComponents: [SprintListComponent,SprintAddComponent]
})
export class SprintModule { }
