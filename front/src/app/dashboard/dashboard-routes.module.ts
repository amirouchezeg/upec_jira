import { NgModule, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardComponent } from './dashboard/dashboard.component';
import { Route } from '@angular/router';

export const MODULE_ROUTES: Route[] = [
  {
    path: '', component: DashboardComponent,
    children: [
      {
        path: '',
        children: [
            {path: '', redirectTo: '', pathMatch: 'full'},
            {path: 'User', loadChildren: '../user/user.module#UserModule'}
        ]
      }
    ]
  }
  

]


@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ]
})
export class DashboardRoutesModule { }
