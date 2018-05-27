import { ThreadComponent } from './thread/thread.component';
import { ZeroComponent } from './zero.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ZeroRoutingModule } from './zero-routing.module';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    SharedModule,
    ZeroRoutingModule
  ],
  declarations: [ZeroComponent, ThreadComponent]
})
export class ZeroModule { }
