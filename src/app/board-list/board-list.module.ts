import { SharedModule } from './../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BoardListComponent } from './board-list.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule
  ],
  declarations: [BoardListComponent]
})
export class BoardListModule { }
