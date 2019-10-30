import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserSignupComponent } from './user-signup/user-signup.component';
import { UserSigninComponent } from './user-signin/user-signin.component';
import { UserScreenComponent } from './user-screen/user-screen.component';


const routes: Routes = [
  { path: '', component: UserScreenComponent,
  children: [
    {
      path: '',
      children: [
        {path: 'signup', component: UserSignupComponent},
        {path: 'signin', component: UserSigninComponent}
      ]
    }
  ]

  }
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
