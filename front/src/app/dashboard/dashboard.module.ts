import { NgModule } from '@angular/core';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HeaderComponent } from '../header/header.component';
import { RouterModule } from '@angular/router';
import { MODULE_ROUTES } from './dashboard-routes.module';
import { SharedModule } from '../_shared/shared.module';
import { HomeComponent } from '../home/home.component';
import { FooterComponent } from '../footer/footer.component';
import { AboutComponent } from '../about/about.component';


@NgModule({
  declarations: [
    DashboardComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    AboutComponent
  ],
  imports: [
    // FooterComponent,
    SharedModule,
    RouterModule.forChild(MODULE_ROUTES)
  ]
})
export class DashboardModule { }
