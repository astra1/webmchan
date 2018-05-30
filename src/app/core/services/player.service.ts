import { IFile } from './../models/models';
import { Injectable } from '@angular/core';
import { Subject, BehaviorSubject } from 'rxjs';

@Injectable()
export class PlayerService {

  private volume$ = new BehaviorSubject<number>(100);
  volume = this.volume$.asObservable();

  private currentPlayList$ = new BehaviorSubject<IFile[]>([]);
  currentPlayList = this.currentPlayList$.asObservable();

  private currentVideo$ = new BehaviorSubject<IFile>({
    displayname: 'empty',
    fullname: 'empty',
    height: 0,
    width: 0,
    md5: null,
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
  });

  currentVideo = this.currentVideo$.asObservable();

  private isPlaying$ = new BehaviorSubject(false);
  isPlaying = this.isPlaying$.asObservable();

  private timeChanged$ = new Subject<number>();
  timeChanged = this.timeChanged$.asObservable();

  private isShuffleOn$ = new BehaviorSubject(false);
  isShuffleOn = this.isShuffleOn$.asObservable();

  private isFullscreen$ = new BehaviorSubject(false);
  isFullscreen = this.isFullscreen$.asObservable();

  constructor() {
  }

  playNext() {
    let pos: number = this.currentPlayList$.value.indexOf(this.currentVideo$.value);

    if (pos === -1) {
      return;
    }

    const video = pos === this.currentPlayList$.value.length - 1
      ? this.currentPlayList$.value[0]
      : this.currentPlayList$.value[++pos];

    this.currentVideo$.next(video);
    this.isPlaying$.next(true);
  }

  playPrev() {
    const playList = this.currentPlayList$.value;

    if (!playList || playList.length <= 0) {
      return;
    }

    let pos: number = playList.indexOf(this.currentVideo$.value);

    let video: IFile;

    if (this.isShuffleOn$.value) {
      const randPos = Math.floor(Math.random() * playList.length);
      video = playList[randPos];
    } else {
      video = pos === 0
        ? this.currentPlayList$.value[this.currentPlayList$.value.length - 1]
        : this.currentPlayList$.value[--pos];
    }

    if (pos === -1 || !video) {
      return;
    }

    this.currentVideo$.next(video);
    this.isPlaying$.next(true);
  }

  playAll() {
    this.currentVideo$.next(this.currentPlayList$.value[0]);
  }

  playFile(videoFile: IFile) {
    this.currentVideo$.next(videoFile);
    this.isPlaying$.next(true);
  }

  pause() {
    this.isPlaying$.next(!this.isPlaying$.value);
  }

  stop() {
    this.isPlaying$.next(false);
  }

  toggleFullscreen() {
    this.isFullscreen$.next(true);
  }

  setVolume(level: number) {
    if (level < 0 || level > 100) {
      level = 10;
    }
    this.volume$.next(level);
  }

  getRandPos(num: number) {
    Math.floor(Math.random() * num);
  }

  toggleShuffle() {
    console.log(this.isShuffleOn$.value);
    this.isShuffleOn$.next(!this.isShuffleOn$.value);
  }

  setTime(seconds: number) {
    const currVideo = this.currentVideo$.value;
    if (currVideo && currVideo.duration_secs >= seconds) {
      this.timeChanged$.next(seconds);
    }
  }

  setPlaysist(playlist: IFile[]) {
    this.currentPlayList$.next(playlist);
  }

  clearPlaylist() {
    this.currentPlayList$.next([]);
  }

}
