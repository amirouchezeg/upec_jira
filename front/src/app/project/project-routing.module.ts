import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProjectListComponent } from './project-list/project-list.component';
import { ProjectAddComponent } from './project-add/project-add.component';
import { ProjectScreenComponent } from './project-screen/project-screen.component';
import { ProjectDetailComponent } from './project-detail/project-detail.component';
import { SprintListComponent } from '../sprint/sprint-list/sprint-list.component';
import { AuthGuardService } from '../_service/auth-guard.service';

const routes: Routes = [
  { path: '', component: ProjectScreenComponent, 
      children: [
        {
          path: '',
          children: [
            {path: '', redirectTo: 'project_list', pathMatch: 'full'},
            {path: 'project_list', component: ProjectListComponent ,canActivate:[AuthGuardService]},
            {path: 'project_add', component: ProjectAddComponent,canActivate:[AuthGuardService]},
            {path: 'project_detail/:idProject', component: SprintListComponent,canActivate:[AuthGuardService]},
            {path: 'project_detail/:idProject/sprint/:idSprint', loadChildren: '../issue/issue.module#IssueModule'},
          ]
        }
      ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProjectRoutingModule { }
