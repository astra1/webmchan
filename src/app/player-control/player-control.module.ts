import { SharedModule } from './../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlayerControlComponent } from './player-control.component';
import { VolumeSliderComponent } from './volume-slider/volume-slider.component';
import { VideoComponent } from './video/video.component';
import { TrackProgressComponent } from './track-progress/track-progress.component';
import { TrackQueueComponent } from './track-queue/track-queue.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule
  ],
  declarations: [PlayerControlComponent,
    VolumeSliderComponent,
    VideoComponent,
    TrackProgressComponent,
    TrackQueueComponent
],
  exports: [PlayerControlComponent]
})
export class PlayerControlModule { }
