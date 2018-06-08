/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { PlayerService } from './player.service';
import { IFile } from '../models/models';

describe('Service: Player', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PlayerService]
    });
  });

  it('should ...', inject([PlayerService], (service: PlayerService) => {
    expect(service).toBeTruthy();
  }));

  it('should play file', inject([PlayerService], (service: PlayerService) => {
    const file: IFile = {
      displayname: 'test',
      fullname: 'full_test',
      height: 0,
      width: 0,
      md5: '235dsg',
      name: 'empty',
      nsfw: 0,
      path: '',
      size: 0,
      thumbnail: '',
      tn_height: 0,
      tn_width: 0,
      type: 0,
      duration: '0',
      duration_secs: 0,
    };

    service.playFile(file);
    service.currentVideo.subscribe(val => expect(val.fullname).toEqual('full_test'));
    service.isPlaying.subscribe(val => expect(val).toBeTruthy());
  }));
});
