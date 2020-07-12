import {
  Component,
  ViewChild,
  ElementRef,
  OnInit,
  Output,
  EventEmitter,
} from "@angular/core";

import { environment } from "../../../../environments/environment";

import { switchMap, tap, filter } from "rxjs/operators";
import { Observable, scheduled, asapScheduler } from "rxjs";
import { IFile } from "../../../core/models/models";
import { PlayerService } from "../../../core/services/player.service";
import { Select, Store } from "@ngxs/store";
import { PlayerState } from "app/core/store/webmchan/states/player/player.state";
import {
  SetCurrentTrackTime,
  SetCurrentTrackTimeLength,
} from "app/core/store/webmchan/states/player/player.actions";

@Component({
  selector: "app-video",
  templateUrl: "./video.component.html",
  styleUrls: ["./video.component.scss"],
})
export class VideoComponent implements OnInit {
  @ViewChild("videoContainer", { static: true })
  videoRef: ElementRef;

  @Select(PlayerState.currentTrack) currentTrack$: Observable<IFile>;
  @Select(PlayerState.volumeLevel) volumeLevel$: Observable<number>;
  @Select(PlayerState.isPlaying) isPlaying$: Observable<boolean>;

  showVideo = false;
  loading = false;

  url = environment.dvachApiUrl;

  @Output()
  played: EventEmitter<number> = new EventEmitter();

  get htmlVideo(): HTMLVideoElement {
    return this.videoRef?.nativeElement as HTMLVideoElement;
  }

  constructor(public playerService: PlayerService, private store: Store) {
    this.createHotkeyHooks();
  }

  ngOnInit() {
    this.currentTrack$
      .pipe(
        filter((track) => !!track),
        tap((res) => console.warn("newtrack", res)),
        switchMap((track) => {
          this.htmlVideo.src = "https://2ch.hk" + track.path;
          // this.htmlVideo.poster = "https://2ch.hk" + track.thumbnail;
          this.htmlVideo.load();
          this.htmlVideo.focus();
          return scheduled([this.htmlVideo.play()], asapScheduler);
        })
      )
      .subscribe();

    this.volumeLevel$
      .pipe(filter((lvl) => lvl >= 0 && lvl <= 100))
      .subscribe((level) => (this.htmlVideo.volume = level / 100));

    this.isPlaying$
      .pipe(
        switchMap((isPlaying) =>
          isPlaying
            ? this.htmlVideo.play()
            : scheduled([this.htmlVideo.pause()], asapScheduler)
        )
      )
      .subscribe();
  }

  createHotkeyHooks() {}

  // private changeVideoSub() {
  //   this.playerService.currentVideo
  //     .pipe(
  //       distinctUntilChanged(),
  //       filter((val) => val.md5 !== null),
  //       tap(() => (this.loading = true)),
  //       switchMap((val) => {
  //         this.video = val;
  //         this.getHtmlVideo().src = "https://2ch.hk" + this.video.path;
  //         this.getHtmlVideo().poster = "https://2ch.hk" + this.video.thumbnail;
  //         this.getHtmlVideo().load();
  //         this.getHtmlVideo().focus();
  //         return from(this.playFile(this.video));
  //       })
  //     )
  //     .subscribe(() => {
  //       this.loading = false;
  //       this.showVideo = true;
  //     });
  // }

  // private videoPlaySub() {
  //   this.playerService.isPlaying
  //     .pipe(
  //       filter(() => !!this.getHtmlVideo()),
  //       flatMap((isPlaying) => {
  //         return isPlaying
  //           ? from(this.playFile(this.video)).pipe(map(() => true))
  //           : of(false);
  //       })
  //     )
  //     .subscribe((val) => {
  //       if (document.fullscreenEnabled) {
  //         this.showVideo = val;
  //       }
  //       if (!val) {
  //         this.getHtmlVideo().pause();
  //       }
  //     });
  // }

  // private toggleFullscreeenSub() {
  //   this.playerService.isFullscreen
  //     .pipe(filter((val) => val === true))
  //     .subscribe((val) => {
  //       if (!this.showVideo) {
  //         this.showVideo = true;
  //       }

  //       var element = this.getHtmlVideo();
  //       var requestMethod = element.requestFullscreen;

  //       if (requestMethod) {
  //         requestMethod.call(element);
  //       }
  //     });
  // }

  // private volumeSub() {
  //   this.playerService.volume
  //     .pipe(
  //       filter(() => !!this.getHtmlVideo()),
  //       map((vol) => vol / 100) // volume must be in [0, 1] range
  //     )
  //     .subscribe((vol) => {
  //       this.getHtmlVideo().volume = vol;
  //     });
  // }

  // playFile(file: IFile) {
  //   return this.getHtmlVideo()
  //     .play()
  //     .catch((err) => console.log("catched: ", err));
  // }

  onEnded() {
    // this.playerService.playNext();
  }

  onTimeUpdated() {
    this.store.dispatch(new SetCurrentTrackTime(this.htmlVideo.currentTime));
    // this.played.next(this.getHtmlVideo().currentTime);
  }

  onLoaded() {
    this.store.dispatch(new SetCurrentTrackTimeLength(this.htmlVideo.duration));
  }

  // setLoading(state: boolean) {
  //   this.loading = state;
  // }
}
