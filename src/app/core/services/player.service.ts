import { IFile } from './../models/models';
import { Injectable } from '@angular/core';
import { Subject, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
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
    duration_secs: 0
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

  constructor() {}

  playNext() {
    const playList = this.currentPlayList$.value;
    let video: IFile = null;
    let pos = -1;

    if (playList.length > 0) {
      pos = playList.findIndex(
        val => val.path === this.currentVideo$.value.path
      );
      return;
    }

    if (pos === -1) {
      this.isPlaying$.next(false);
      return;
    }

    video = this.isShuffleOn$.value
      ? playList[this.getRandPos(playList.length)]
      : playList[pos === playList.length - 1 ? 0 : ++pos];

    if (video) {
      this.currentVideo$.next(video);
      this.isPlaying$.next(true);
    }
  }

  playPrev() {
    const playList = this.currentPlayList$.value;
    let video: IFile = null;
    let pos = -1;

    if (playList && playList.length > 1) {
      pos = playList.findIndex(
        val => val.path === this.currentVideo$.value.path
      );
    }

    video = this.isShuffleOn$.value
      ? playList[this.getRandPos(playList.length)]
      : this.currentPlayList$.value[pos === 0 ? playList.length - 1 : --pos];

    if (video) {
      this.currentVideo$.next(video);
      this.isPlaying$.next(true);
    }
  }

  playAll() {
    this.playFile(this.currentPlayList$.value[0]);
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
    if (level < 0) {
      level = 0;
    } else if (level > 100) {
      level = 100;
    }

    this.volume$.next(level);
  }

  getRandPos(num: number): number {
    let res = Math.floor(Math.random() * num);
    return res < 0 ? 0 : res;
  }

  toggleShuffle() {
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
