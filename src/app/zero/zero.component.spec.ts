import { SharedModule } from './../shared/shared.module';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ZeroComponent } from './zero.component';
import { MaterialModule } from '../shared/material.module';
import { ApiService } from '../core/services/api.service';

describe('ZeroComponent', () => {
  let component: ZeroComponent;
  let fixture: ComponentFixture<ZeroComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [MaterialModule, SharedModule],
      declarations: [ZeroComponent],
      providers: [ApiService]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ZeroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
