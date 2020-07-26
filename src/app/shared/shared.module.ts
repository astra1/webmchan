import { FloorPipe } from "./../core/pipes/floor.pipe";
import { MinuteSecondsPipe } from "./../core/pipes/minute-seconds.pipe";
import { MaterialModule } from "./material.module";
import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { RouterModule } from "@angular/router";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { FlexLayoutModule } from "@angular/flex-layout";

@NgModule({
  imports: [
    BrowserAnimationsModule,
    CommonModule,
    FontAwesomeModule,
    FormsModule,
    FlexLayoutModule,
    MaterialModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule,
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
    HttpClientModule,
    RouterModule,
  ],
})
export class SharedModule {}
