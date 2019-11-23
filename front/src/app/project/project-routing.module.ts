import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProjectListComponent } from './project-list/project-list.component';
import { ProjectAddComponent } from './project-add/project-add.component';
import { ProjectScreenComponent } from './project-screen/project-screen.component';
import { ProjectDetailComponent } from './project-detail/project-detail.component';
import { SprintListComponent } from '../sprint/sprint-list/sprint-list.component';



const routes: Routes = [
  { path: '', component: ProjectScreenComponent, 
      children: [
        {
          path: '',
          children: [
            {path: '', redirectTo: 'project_list', pathMatch: 'full'},
            {path: 'project_list', component: ProjectListComponent},
            {path: 'project_add', component: ProjectAddComponent},
            {path: 'project_detail/:idProject', component: SprintListComponent}
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
