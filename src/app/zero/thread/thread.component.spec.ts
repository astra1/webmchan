import { PlayerService } from './../../core/services/player.service';
/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ThreadComponent } from './thread.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MaterialModule } from '../../shared/material.module';
import { RouterTestingModule } from '@angular/router/testing';
import { ApiService } from '../../core/services/Api.service';
import { HttpClientModule } from '@angular/common/http';

describe('ThreadComponent', () => {
  let component: ThreadComponent;
  let fixture: ComponentFixture<ThreadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FontAwesomeModule, MaterialModule, RouterTestingModule, HttpClientModule],
      declarations: [ThreadComponent],
      providers: [ApiService, PlayerService]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ThreadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
