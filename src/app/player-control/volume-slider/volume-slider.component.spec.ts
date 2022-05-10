import { PlayerService } from './../../core/services/player.service';
import { MaterialModule } from './../../shared/material.module';
/* tslint:disable:no-unused-variable */
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { VolumeSliderComponent } from './volume-slider.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

describe('VolumeSliderComponent', () => {
  let component: VolumeSliderComponent;
  let fixture: ComponentFixture<VolumeSliderComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [FontAwesomeModule, MaterialModule],
      declarations: [VolumeSliderComponent],
      providers: [PlayerService]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VolumeSliderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
