import { Component, ViewChild, ElementRef, OnInit, EventEmitter } from '@angular/core';

import { PlayerService } from './../../core/services/player.service';
import { IFile } from './../../core/models/models';

import { filter, tap, map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { Output } from '@angular/core';

@Component({
  selector: 'app-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.css']
})
export class VideoComponent implements OnInit {
  @ViewChild('videoContainer')
  videoRef: ElementRef;

  video: IFile = null;
  showVideo = false;

  url = environment.dvachApiUrl;

  @Output()
  played: EventEmitter<number> = new EventEmitter();

  getHtmlVideo(): HTMLVideoElement {
    return (this.videoRef.nativeElement as HTMLVideoElement);
  }

  constructor(private ps: PlayerService) { }

  ngOnInit() {
    this.ps.currentVideo
      .pipe(
        filter(val => val.md5 !== null)
      )
      .subscribe(val => {
        this.video = val;
        this.playFile(this.video);
      });

    // subscribe to volume change
    this.ps.volume
      .pipe(
        map(vol => vol / 100) // volume must be in [0, 1] range
      )
      .subscribe(vol => {
        this.getHtmlVideo().volume = vol;
      });

    this.ps.isPlaying
      .subscribe(val => {
        if (val) {
          this.showVideo = true;
          this.getHtmlVideo().play();
        } else {
          this.getHtmlVideo().pause();
          this.showVideo = false;
        }
      });

    this.ps.timeChanged
      .subscribe(val => this.getHtmlVideo().currentTime = val);

    this.ps.isFullscreen.pipe(filter(val => val === true)).subscribe(val => {
      if (this.getHtmlVideo().requestFullscreen) {
        this.getHtmlVideo().requestFullscreen();
      } else if (this.getHtmlVideo().webkitRequestFullscreen) {
        this.getHtmlVideo().webkitRequestFullscreen();
      }
    });
  }



  playFile(file: IFile) {
    this.getHtmlVideo().src = 'https://2ch.hk' + file.path;
    this.getHtmlVideo().load();
    this.getHtmlVideo().focus();
    return this.getHtmlVideo().play();
  }

  onEnded() {
    this.ps.playNext();
  }

  onTimeUpdated() {
    this.played.next(this.getHtmlVideo().currentTime);
  }

}
