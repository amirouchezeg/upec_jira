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
import { ButtonModule } from 'primeng/button';
import {FieldsetModule} from 'primeng/fieldset';

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

    ButtonModule,
    FieldsetModule
    ]

@NgModule({
    imports: [sharedModules,MatDatepickerModule,MatNativeDateModule], 
    declarations: [],
    exports: [sharedModules,MatDatepickerModule] , 
    providers: []
})

export class SharedModule { }