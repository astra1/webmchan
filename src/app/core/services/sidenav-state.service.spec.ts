/* tslint:disable:no-unused-variable */

import { TestBed, inject, waitForAsync } from '@angular/core/testing';
import { SidenavStateService } from './sidenav-state.service';

describe('Service: SidenavState', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SidenavStateService]
    });
  });

  it('should ...', inject([SidenavStateService], (service: SidenavStateService) => {
    expect(service).toBeTruthy();
  }));
});
