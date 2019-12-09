import { NgModule, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardComponent } from './dashboard/dashboard.component';
import { Route } from '@angular/router';
import { HomeComponent } from '../home/home.component';

export const MODULE_ROUTES: Route[] = [
  {
    path: '', component: DashboardComponent,
    children: [
      {
        path: '',
        children: [
            // {path: '', redirectTo: '', pathMatch: 'full'},
            {path: 'user', loadChildren: '../user/user.module#UserModule'},
            { path: 'project', loadChildren: '../project/project.module#ProjectModule' },
            {path: '', component: HomeComponent },
            // { path: 'issue', loadChildren: '../issue/issue.module#IssueModule' },

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
