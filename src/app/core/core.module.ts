import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HotkeyModule } from 'angular2-hotkeys';

@NgModule({
  imports: [CommonModule, HotkeyModule.forRoot()],
  providers: [],
  declarations: []
})
export class CoreModule {}
