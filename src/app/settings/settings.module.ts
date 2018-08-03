import { SharedModule } from './../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SettingsComponent } from './settings.component';

@NgModule({
  imports: [
    SharedModule
  ],
  declarations: [SettingsComponent]
})
export class SettingsModule { }
