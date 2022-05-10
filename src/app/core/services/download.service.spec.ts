/* tslint:disable:no-unused-variable */

import { TestBed, inject, waitForAsync } from '@angular/core/testing';
import { DownloadService } from './download.service';

describe('Service: Download', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DownloadService]
    });
  });

  it('should ...', inject([DownloadService], (service: DownloadService) => {
    expect(service).toBeTruthy();
  }));
});
