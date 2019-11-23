import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ProjectAddComponent } from './project/project-add/project-add.component';
import { ProjectListComponent } from './project/project-list/project-list.component';
import { SharedModule } from './_shared/shared.module';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { HttpClientModule } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DialogProfileComponent } from './header/dialog-profile/dialog-profile.component';
import { DialogPasswordComponent } from './header/dialog-password/dialog-password.component';
import { NotFoundComponent } from './not-found/not-found.component';


@NgModule({
  declarations: [
    AppComponent,
    DialogProfileComponent,
    DialogPasswordComponent,
    NotFoundComponent,
  ],
  imports: [
    
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    HttpClientModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MDBBootstrapModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [DialogProfileComponent,DialogPasswordComponent]
})
export class AppModule { }