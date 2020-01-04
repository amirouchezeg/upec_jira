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
    MatSnackBarModule,
    MatProgressBarModule
} from '@angular/material';

import { MDBBootstrapModule, NavbarModule, IconsModule } from 'angular-bootstrap-md';
import { ButtonModule } from 'primeng/button';
import {FieldsetModule} from 'primeng/fieldset';
import {CardModule} from 'primeng/card';
import { ReactiveFormsModule } from '@angular/forms';
import {ToastModule} from 'primeng/toast';
import {TableModule} from 'primeng/table';

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
    MatProgressBarModule,
    ButtonModule,
    FieldsetModule,
    CardModule,
    ReactiveFormsModule,
    ToastModule,
    TableModule
    ]

@NgModule({
    imports: [sharedModules,MatDatepickerModule,MatNativeDateModule], 
    declarations: [],
    exports: [sharedModules,MatDatepickerModule] , 
    providers: []
})

export class SharedModule { }