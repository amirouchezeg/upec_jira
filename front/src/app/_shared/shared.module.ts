import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
    MatChipsModule,
    MatSidenavModule,
    MatToolbarModule,
    MatListModule,
    MatIconModule,
    MatFormFieldModule,
    MatDialogModule,
    MatButtonToggleModule,
    MatSlideToggleModule,
    MatExpansionModule,
    MatMenuModule,
    MatTabsModule,
    MatRadioModule,
    MatInputModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
    MatCardModule,
    MatAutocompleteModule,
    MatStepperModule,
    MatSnackBarModule
} from '@angular/material';
import { MDBBootstrapModule, NavbarModule, IconsModule } from 'angular-bootstrap-md';

const sharedModules: any[] = [
    MatChipsModule,
    MatSidenavModule,
    MatToolbarModule,
    MatListModule,
    MatIconModule,
    CommonModule,
    MatFormFieldModule,
    MatDialogModule,
    MatButtonToggleModule,
    MatSlideToggleModule,
    MatExpansionModule,
    MatMenuModule,
    MatTabsModule,
    MatRadioModule,
    MatInputModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
    MatCardModule,
    MatAutocompleteModule,
    MatStepperModule,
    MatSnackBarModule,
    NavbarModule,
    IconsModule,
    ]

@NgModule({
    imports: [sharedModules,MatDatepickerModule,MatNativeDateModule], 
    declarations: [],
    exports: [sharedModules,MatDatepickerModule] , 
    providers: []
})

export class SharedModule { }