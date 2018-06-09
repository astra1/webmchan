import { Component, ViewChild, ElementRef, OnInit, Output, EventEmitter } from '@angular/core';
import { environment } from '../../../environments/environment';

import { PlayerService } from './../../core/services/player.service';

import { filter, tap, map, switchMap, distinctUntilChanged } from 'rxjs/operators';
import { from, of } from 'rxjs';
import { IFile } from './../../core/models/models';

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
  loading = false;

  url = environment.dvachApiUrl;

  @Output()
  played: EventEmitter<number> = new EventEmitter();

  getHtmlVideo(): HTMLVideoElement {
    return this.videoRef && (this.videoRef.nativeElement as HTMLVideoElement);
  }

  get isPlaying() {
    const video = this.getHtmlVideo();
    return video && video.currentTime > 0 && !video.paused && !video.ended
      && video.readyState > 2;

  }
  constructor(private ps: PlayerService) { }

  ngOnInit() {
    this.getHtmlVideo().onloadeddata = () => {
      this.loading = false;
    };


    this.getHtmlVideo().onloadstart = () => {
      this.loading = true;
    };

    // current video change sub
    this.ps.currentVideo
      .pipe(
        distinctUntilChanged(),
        filter(val => val.md5 !== null),
        tap(() => this.loading = true),
        switchMap(val => {
          this.video = val;
          return from(this.playFile(this.video));
        })
      )
      .subscribe(() => {
        this.loading = false;
      });

    // subscribe to volume change
    this.ps.volume
      .pipe(
        filter(() => !!this.getHtmlVideo()),
        map(vol => vol / 100) // volume must be in [0, 1] range
      )
      .subscribe(vol => {
        this.getHtmlVideo().volume = vol;
      });

    this.ps.isPlaying
      .pipe(
        filter(() => !!this.getHtmlVideo()),
        switchMap((isPlaying) => {
          return isPlaying ?
            from(this.playFile(this.video)).pipe(map(() => true))
            : of(false);
        }),
    )
      .subscribe(val => {
        this.showVideo = val;
        if (!val) {
          this.getHtmlVideo().pause();
        }
      });

    this.ps.timeChanged
      .subscribe(val => this.getHtmlVideo().currentTime = val);

    this.ps.isFullscreen.pipe(filter(val => val === true)).subscribe(val => {
      if (!this.showVideo) {
        this.showVideo = true;
      }

      if (this.getHtmlVideo().requestFullscreen) {
        this.getHtmlVideo().requestFullscreen();
      } else if (this.getHtmlVideo().webkitRequestFullscreen) {
        this.getHtmlVideo().webkitRequestFullscreen();
      }
    });
  }



  playFile(file: IFile) {
    this.getHtmlVideo().src = 'https://2ch.hk' + file.path;
    this.getHtmlVideo().poster = 'https://2ch.hk' + file.thumbnail;
    this.getHtmlVideo().load();
    this.getHtmlVideo().focus();
    return this.getHtmlVideo().play()
      .catch((err) => console.log('catched: ', err));
  }

  onEnded() {
    this.ps.playNext();
  }

  onTimeUpdated() {
    this.played.next(this.getHtmlVideo().currentTime);
  }

}
