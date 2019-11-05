import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { UserModule } from './user/user.module';
import { ProjectModule } from './project/project.module';


const routes: Routes = [
  // ,canActivate:[AuthGuard]
  // { path: '', redirectTo:'jira', pathMatch:'full' },
  { path: '', loadChildren: './dashboard/dashboard.module#DashboardModule' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {onSameUrlNavigation: 'reload'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
