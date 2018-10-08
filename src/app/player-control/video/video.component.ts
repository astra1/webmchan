import {
  Component,
  ViewChild,
  ElementRef,
  OnInit,
  Output,
  EventEmitter
} from '@angular/core';

import { environment } from '../../../environments/environment';

import {
  filter,
  tap,
  map,
  switchMap,
  distinctUntilChanged,
  flatMap
} from 'rxjs/operators';
import { from, of } from 'rxjs';
import { IFile } from './../../core/models/models';
import { HotkeysService, Hotkey } from 'angular2-hotkeys';
import { PlayerService } from './../../core/services/player.service';

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

  constructor(
    private playerService: PlayerService,
    private hotkeysService: HotkeysService
  ) {
    this.createHotkeyHook('shift+right', this.playerService.playNext());
    this.createHotkeyHook('shift+left', this.playerService.playPrev());
    this.createHotkeyHook('shift+space', this.playerService.pause());
    this.createHotkeyHook('f', this.playerService.toggleFullscreen());
  }

  private createHotkeyHook(hotkeyName: string, callback: void) {
    let hotkey = new Hotkey(
      hotkeyName,
      (event: KeyboardEvent): boolean => {
        callback;
        return false;
      }
    );

    this.hotkeysService.add(hotkey);
  }

  ngOnInit() {
    this.getHtmlVideo().onloadeddata = () => this.setLoading(false);
    this.getHtmlVideo().onloadstart = () => this.setLoading(true);

    this.changeVideoSub();

    this.playerService.timeChanged.subscribe(
      val => (this.getHtmlVideo().currentTime = val)
    );

    this.videoPlaySub();
    this.volumeSub();
    this.toggleFullscreeenSub();
  }

  private changeVideoSub() {
    this.playerService.currentVideo
      .pipe(
        distinctUntilChanged(),
        filter(val => val.md5 !== null),
        tap(() => (this.loading = true)),
        switchMap(val => {
          this.video = val;
          this.getHtmlVideo().src = 'https://2ch.hk' + this.video.path;
          this.getHtmlVideo().poster = 'https://2ch.hk' + this.video.thumbnail;
          this.getHtmlVideo().load();
          this.getHtmlVideo().focus();
          return from(this.playFile(this.video));
        })
      )
      .subscribe(() => {
        this.loading = false;
        this.showVideo = true;
      });
  }

  private videoPlaySub() {
    this.playerService.isPlaying
      .pipe(
        filter(() => !!this.getHtmlVideo()),
        flatMap(isPlaying => {
          return isPlaying
            ? from(this.playFile(this.video)).pipe(map(() => true))
            : of(false);
        })
      )
      .subscribe(val => {
        if (!this.getHtmlVideo().webkitDisplayingFullscreen) {
          this.showVideo = val;
        }
        if (!val) {
          this.getHtmlVideo().pause();
        }
      });
  }

  private toggleFullscreeenSub() {
    this.playerService.isFullscreen
      .pipe(filter(val => val === true))
      .subscribe(val => {
        if (!this.showVideo) {
          this.showVideo = true;
        }

        this.getHtmlVideo().webkitRequestFullScreen();
      });
  }

  private volumeSub() {
    this.playerService.volume
      .pipe(
        filter(() => !!this.getHtmlVideo()),
        map(vol => vol / 100) // volume must be in [0, 1] range
      )
      .subscribe(vol => {
        this.getHtmlVideo().volume = vol;
      });
  }

  playFile(file: IFile) {
    return this.getHtmlVideo()
      .play()
      .catch(err => console.log('catched: ', err));
  }

  onEnded() {
    this.playerService.playNext();
  }

  onTimeUpdated() {
    this.played.next(this.getHtmlVideo().currentTime);
  }

  setLoading(state: boolean) {
    this.loading = state;
  }
}
