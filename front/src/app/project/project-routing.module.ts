import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProjectListComponent } from './project-list/project-list.component';
import { ProjectAddComponent } from './project-add/project-add.component';
import { ProjectScreenComponent } from './project-screen/project-screen.component';


const routes1: Routes = [
  { path: '', redirectTo: 'project_list', pathMatch: 'full'},
  { path: 'project_list', component: ProjectListComponent }, 
  { path: 'project_add', component: ProjectAddComponent },
];

const routes: Routes = [
  { path: '', component: ProjectScreenComponent, 
      children: [
        {
          path: '',
          children: [
            {path: '', redirectTo: 'project_list', pathMatch: 'full'},
            {path: 'project_list', component: ProjectListComponent},
            {path: 'project_add', component: ProjectAddComponent},
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
