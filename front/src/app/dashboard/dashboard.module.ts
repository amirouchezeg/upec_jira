import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HeaderComponent } from '../header/header.component';
import { RouterModule } from '@angular/router';
import { MODULE_ROUTES } from './dashboard-routes.module';
import { SharedModule } from '../_shared/shared.module';



@NgModule({
  declarations: [
    DashboardComponent,
    HeaderComponent
  ],
  imports: [
    SharedModule,
    RouterModule.forChild(MODULE_ROUTES)
  ]
})
export class DashboardModule { }
