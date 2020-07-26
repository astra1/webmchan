import {
  Component,
  ElementRef,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
  ViewChild,
} from "@angular/core";
import { Actions, ofActionSuccessful, Select, Store } from "@ngxs/store";
import {
  NextTrack,
  SetCurrentTrackTime,
  SetCurrentTrackTimeLength,
  SetCustomTrackTime,
  SetFullscreen,
  SetIsPlaying,
} from "app/core/store/webmchan/states/player/player.actions";
import { PlayerState } from "app/core/store/webmchan/states/player/player.state";
import { asapScheduler, Observable, scheduled } from "rxjs";
import {
  catchError,
  exhaustMap,
  filter,
  pluck,
  switchMap,
  tap,
} from "rxjs/operators";
import videojs, { VideoJsPlayer, VideoJsPlayerOptions } from "video.js";
import { IFile } from "../../../core/models/models";
import { PlayerService } from "../../../core/services/player.service";

@Component({
  selector: "app-video",
  templateUrl: "./video.component.html",
  styleUrls: ["./video.component.scss"],
})
export class VideoComponent implements OnInit, OnDestroy {
  @ViewChild("videoContainer", { static: true })
  videoRef: ElementRef;
  videoPlayer: VideoJsPlayer;

  @Select(PlayerState.currentTrack) currentTrack$: Observable<IFile>;
  @Select(PlayerState.volumeLevel) volumeLevel$: Observable<number>;
  @Select(PlayerState.isPlaying) isPlaying$: Observable<boolean>;

  showVideo = false;
  loading = false;

  @Output()
  played: EventEmitter<number> = new EventEmitter();

  readonly videoPlayerOpts: VideoJsPlayerOptions = {
    controls: false,
    liveui: false,
    controlBar: false,
    fluid: false,
  };

  constructor(
    public playerService: PlayerService,
    private store: Store,
    private actions$: Actions
  ) {
    // this.createHotkeyHooks();
  }

  ngOnInit() {
    this.videoPlayer = videojs(
      this.videoRef.nativeElement,
      this.videoPlayerOpts
    );

    this.currentTrack$
      .pipe(
        filter((track) => !!track),
        exhaustMap((track) => {
          this.videoPlayer.src(track.path);
          this.videoPlayer.load();
          return scheduled(
            [
              this.videoPlayer.play(), // ignore: load/play annoying error
            ],
            asapScheduler
          );
        }),
        catchError(() => {
          return scheduled([null], asapScheduler);
        })
      )
      .subscribe();

    this.volumeLevel$
      .pipe(filter((lvl) => lvl >= 0 && lvl <= 100))
      .subscribe((level) => this.videoPlayer.volume(level / 100));

    this.actions$
      .pipe(
        ofActionSuccessful(SetIsPlaying),
        pluck("payload"),
        filter((playing) => playing),
        switchMap(() => this.videoPlayer.play())
      )
      .subscribe();

    this.actions$
      .pipe(
        ofActionSuccessful(SetIsPlaying),
        pluck("payload"),
        filter((playing) => !playing),
        tap(() => this.videoPlayer.pause())
      )
      .subscribe();

    this.actions$
      .pipe(
        ofActionSuccessful(SetFullscreen),
        tap(() => this.videoPlayer.requestFullscreen())
      )
      .subscribe();

    this.actions$
      .pipe(
        ofActionSuccessful(SetCustomTrackTime),
        pluck("payload"),
        tap((time) => this.videoPlayer.currentTime(time))
      )
      .subscribe();
  }

  createHotkeyHooks() {}

  onEnded() {
    this.store.dispatch(new NextTrack());
  }

  onTimeUpdated() {
    if (this.videoPlayer.paused()) {
      return;
    }
    this.store.dispatch(
      new SetCurrentTrackTime(this.videoPlayer.currentTime())
    );
  }

  onLoaded() {
    this.store.dispatch(
      new SetCurrentTrackTimeLength(this.videoPlayer.duration())
    );
  }

  ngOnDestroy() {
    this.videoPlayer.dispose();
  }
}
