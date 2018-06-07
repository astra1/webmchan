import { DownloadService } from './../core/services/download.service';
import { environment } from './../../environments/environment';
import { PlayerService } from './../core/services/player.service';
import { IFile } from './../core/models/models';
import { Component, HostListener, OnInit } from '@angular/core';
import {
  faRedo,
  faStepBackward,
  faStepForward,
  faRandom,
  faPlay,
  faPause,
  faArrowsAlt,
  faEllipsisV
} from '@fortawesome/free-solid-svg-icons';
import { filter, tap } from 'rxjs/operators';
import { ElectronService } from '../core/services/electron.service';

@Component({
  selector: 'app-player-control',
  templateUrl: './player-control.component.html',
  styleUrls: ['./player-control.component.css']
})
export class PlayerControlComponent implements OnInit {

  isNative = false;

  faDots = faEllipsisV;
  faPlay = faPlay;
  faPause = faPause;
  faRandom = faRandom;
  faRedo = faRedo;
  faFullscreen = faArrowsAlt;
  faStepBack = faStepBackward;
  faStepForw = faStepForward;

  currentTime = 0;
  trackLength = 1;

  currentTrack: IFile = null;

  isPlaying = false;
  isShuffled = false;

  constructor(private ps: PlayerService, private es: ElectronService, private ds: DownloadService) { }

  @HostListener('window:keydown', ['$event'])
  onKeyDown(event) {
    this.onVideoKeyPress(event.code);
  }

  ngOnInit() {
    this.isNative = this.es.isElectron() || false;

    this.ps.currentVideo
      .pipe(
        filter(val => !!val.md5)
      )
      .subscribe(val => {
        this.currentTrack = val;
        this.trackLength = val.duration_secs;
      });

    this.ps.isPlaying.subscribe(val => this.isPlaying = val);

    this.ps.isShuffleOn.subscribe(val => this.isShuffled = val);
  }

  getTrackThumb() {
    return this.currentTrack && this.currentTrack.thumbnail !== ''
      ? environment.dvachApiUrl + this.currentTrack.thumbnail
      : './assets/icons/webmchan.svg';
  }

  onTimeSelect(seconds: number) {
    this.ps.setTime(seconds);
  }

  updateTime(seconds: number) {
    this.currentTime = seconds;
  }

  playNext() {
    this.ps.playNext();
  }

  playPrev() {
    this.ps.playPrev();
  }

  play() {
    this.ps.pause();
  }

  toggleShuffle() {
    this.ps.toggleShuffle();
  }

  toggleFullscreen() {
    this.ps.toggleFullscreen();
  }

  onVideoKeyPress(code: string) {
    // code: "BracketRight
    // code: "Space"
    // code: "keyF"

    // if (this.currentVideo) {
    //   switch (event.key) {
    //     case ']':
    //       this.getNextVideo(this.currentVideo.name);
    //       console.log('hey');
    //       break;
    //     case '[':
    //       this.getPrevVideo(this.currentVideo.name);
    //       break;
    //     case 'Escape':
    //       this.getHtmlVideo().pause();
    //       this.getHtmlVideo().src = '';
    //       this.getHtmlVideo().load();
    //       this.showVideo = false;
    //       this.currentVideo = null;
    //       break;
    //     case 'f':
    //       this.getHtmlVideo().webkitRequestFullscreen();
    //       break;
    //     case 'Alt':
    //       this.getHtmlVideo().controls = !this.getHtmlVideo().controls;
    //       console.log(this.getHtmlVideo().controls);
    //       break;
    //     default:
    //       console.log(event.key);
    //       console.log('huhey');
    //       break;
    //   }
    // }
  }

  saveVideo() {
    // todo в отдельный сэрвис
    if (this.es.isElectron()) {
      const filePath = this.es.remote.dialog.showSaveDialog({
        defaultPath: this.es.remote.app.getPath('desktop'),
        title: this.currentTrack.name
      });

      if (!filePath) {
        return;
      }

      this.ds.download(this.currentTrack.path)
        .pipe(tap(val => console.log(val)))
        .subscribe((val) => {
          this.es.fs.writeFile(filePath, val, (err) => {
            if (!err) {
              console.log('fileSaved');
            } else {
              console.log('error!');
            }
          });
        });

      // this.es.fs.writeFile()

    }
    // console.log(this.es.path.resolve(
    //   this.es.remote.app.getPath('desktop'),
    //   this.es.path.basename(this.currentTrack.path)
    // ));

    // if (this.es.isElectron()) {
    //   const toLocalPath = this.es.path.resolve(
    //     this.es.remote.app.getPath('desktop'),
    //     this.es.path.basename(this.currentTrack.path)
    //   );

    //   const userChosenPath = this.es.remote.dialog.showSaveDialog({ defaultPath: toLocalPath });

    //   if (userChosenPath) {
    //     this.ds.download(this.currentTrack.path)
    //       .pipe(tap(val => console.log(val)))
    //       .subscribe((val) => {
    //         this.es.fs.writeFileSync(userChosenPath, val);
    //       });
    //   }
    // }
  }
}
