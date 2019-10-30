import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router'
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ProjectAddComponent } from './project/project-add/project-add.component';
import { ProjectListComponent } from './project/project-list/project-list.component';
import { SharedModule } from './_shared/shared.module';
import { MDBBootstrapModule } from 'angular-bootstrap-md';


@NgModule({
  declarations: [
    AppComponent 
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    
    BrowserAnimationsModule,
    HttpClientModule,
    MDBBootstrapModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }