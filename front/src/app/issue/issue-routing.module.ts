import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IssueScreenComponent } from './issue-screen/issue-screen.component';
import { AddIssueComponent } from './add-issue/add-issue.component';
import { OneSprintComponent } from './one-sprint/one-sprint.component';


const routes: Routes = [
  { path: '', component: IssueScreenComponent, 
      children: [
        {
          path: '',
          children: [ 
            {path: '', redirectTo: 'one_sprint', pathMatch: 'full'},
            {path: 'one_sprint', component: OneSprintComponent},
            // {path: 'add_issue', component: AddIssueComponent},
          ]
        }
      ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class IssueRoutingModule { }
