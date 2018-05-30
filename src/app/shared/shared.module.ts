import { MaterialModule } from './material.module';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FlexLayoutModule } from '@angular/flex-layout';

import { SatPopoverModule } from '@ncstate/sat-popover';


@NgModule({
    imports: [
        BrowserAnimationsModule,
        CommonModule,
        FontAwesomeModule,
        FormsModule,
        FlexLayoutModule,
        MaterialModule,
        ReactiveFormsModule,
        SatPopoverModule,
        HttpClientModule,
        RouterModule
    ],
    declarations: [
    ],
    exports: [
        BrowserAnimationsModule,
        CommonModule,
        FontAwesomeModule,
        FormsModule,
        FlexLayoutModule,
        MaterialModule,
        ReactiveFormsModule,
        SatPopoverModule,
        HttpClientModule,
        RouterModule,
    ]
})
export class SharedModule { }
