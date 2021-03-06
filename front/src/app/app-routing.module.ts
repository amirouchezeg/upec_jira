import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { UserModule } from './user/user.module';
import { ProjectModule } from './project/project.module';
import { NotFoundComponent } from './not-found/not-found.component';


const routes: Routes = [
  // ,canActivate:[AuthGuard]
  // { path: '', redirectTo:'jira', pathMatch:'full' },
  { path: '', loadChildren: './dashboard/dashboard.module#DashboardModule' },
  {path: '404', component: NotFoundComponent},
  {path: '**', redirectTo: '/404'}
  // { path: 'issue', loadChildren: './issue/issue.module#IssueModule' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {onSameUrlNavigation: 'reload'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
