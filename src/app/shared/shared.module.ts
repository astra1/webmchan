import { FloorPipe } from './../core/pipes/floor.pipe';
import { MinuteSecondsPipe } from './../core/pipes/minute-seconds.pipe';
import { MomentModule } from 'ngx-moment';
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
    MomentModule,
    ReactiveFormsModule,
    SatPopoverModule,
    HttpClientModule,
    RouterModule
  ],
  declarations: [FloorPipe, MinuteSecondsPipe],
  exports: [
    BrowserAnimationsModule,
    CommonModule,
    FontAwesomeModule,
    FormsModule,
    FlexLayoutModule,
    // pipes
    FloorPipe,
    MinuteSecondsPipe,
    MaterialModule,
    MomentModule,
    ReactiveFormsModule,
    SatPopoverModule,
    HttpClientModule,
    RouterModule
  ]
})
export class SharedModule {}
