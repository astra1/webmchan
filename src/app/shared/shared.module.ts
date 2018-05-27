import { MaterialModule } from './material.module';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


@NgModule({
    imports: [
        BrowserAnimationsModule,
        CommonModule,
        FormsModule,
        MaterialModule,
        ReactiveFormsModule,
        HttpClientModule,
        RouterModule
    ],
    declarations: [
    ],
    exports: [
        BrowserAnimationsModule,
        CommonModule,
        FormsModule,
        MaterialModule,
        ReactiveFormsModule,
        HttpClientModule,
        RouterModule,
    ]
})
export class SharedModule { }
