import { PlayerService } from './../core/services/player.service';
import { SharedModule } from './../shared/shared.module';
import { TrackProgressComponent } from './track-progress/track-progress.component';
import { VideoComponent } from './video/video.component';
/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { PlayerControlComponent } from './player-control.component';
import { MaterialModule } from '../shared/material.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { VolumeSliderComponent } from './volume-slider/volume-slider.component';

describe('PlayerControlComponent', () => {
  let component: PlayerControlComponent;
  let fixture: ComponentFixture<PlayerControlComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        FontAwesomeModule,
        SharedModule,
        MaterialModule
      ],
      declarations: [
        PlayerControlComponent,
        VideoComponent,
        VolumeSliderComponent,
        TrackProgressComponent,
      ],
      providers: [
        PlayerService
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlayerControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
