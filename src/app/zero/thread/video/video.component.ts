import {
  Component,
  ElementRef,
  EventEmitter,
  isDevMode,
  OnDestroy,
  OnInit,
  Output,
  ViewChild,
  ViewContainerRef,
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
import * as Plyr from "plyr";
import { asapScheduler, Observable, scheduled, Subject } from "rxjs";
import {
  catchError,
  exhaustMap,
  filter,
  map,
  pluck,
  takeUntil,
  tap,
} from "rxjs/operators";
import { IFile } from "../../../core/models/models";
import { PlayerService } from "../../../core/services/player.service";

@Component({
  selector: "app-video",
  templateUrl: "./video.component.html",
  styleUrls: ["./video.component.scss"],
})
export class VideoComponent implements OnInit, OnDestroy {
  @ViewChild("video", { static: true, read: ViewContainerRef })
  videoRef: ElementRef;
  plyr: Plyr;

  @Select(PlayerState.currentTrack) currentTrack$: Observable<IFile>;
  @Select(PlayerState.volumeLevel) volumeLevel$: Observable<number>;
  @Select(PlayerState.isPlaying) isPlaying$: Observable<boolean>;

  showVideo = false;
  loading = false;

  @Output()
  played: EventEmitter<number> = new EventEmitter();

  private destroy$ = new Subject<void>();

  constructor(
    public playerService: PlayerService,
    private store: Store,
    private actions$: Actions
  ) {
    // this.createHotkeyHooks();
  }

  ngOnInit() {
    this.setupPlayer();

    this.setupCurrentTrack();

    this.setupCurrentVolume();

    this.actions$
      .pipe(
        ofActionSuccessful(SetIsPlaying),
        pluck("payload"),
        tap((isPlaying) => this.plyr.togglePlay(isPlaying)),
        takeUntil(this.destroy$)
      )
      .subscribe();

    this.actions$
      .pipe(
        ofActionSuccessful(SetFullscreen),
        tap(() => this.plyr.fullscreen.enter()),
        takeUntil(this.destroy$)
      )
      .subscribe();

    this.actions$
      .pipe(
        ofActionSuccessful(SetCustomTrackTime),
        pluck("payload"),
        tap((time) => (this.plyr.currentTime = time)),
        takeUntil(this.destroy$)
      )
      .subscribe();
  }

  createHotkeyHooks() {}

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
    this.plyr.destroy();
  }

  private setupPlayer() {
    this.plyr = new Plyr("#plyrID", {
      debug: isDevMode(),
    });

    this.plyr.on("timeupdate", () => this.onTimeUpdated());
    this.plyr.on("loadedmetadata", () => this.onLoaded());
    this.plyr.on("ended", () => this.onEnded());
  }

  private onEnded() {
    this.store.dispatch(new NextTrack());
  }

  private onTimeUpdated() {
    if (this.plyr.paused) {
      return;
    }
    this.store.dispatch(new SetCurrentTrackTime(this.plyr.currentTime));
  }

  private onLoaded() {
    this.store.dispatch(new SetCurrentTrackTimeLength(this.plyr.duration));
  }

  private setupCurrentVolume() {
    this.volumeLevel$
      .pipe(
        filter((lvl) => lvl >= 0 && lvl <= 100),
        takeUntil(this.destroy$)
      )
      .subscribe((level) => (this.plyr.volume = level / 100));
  }

  private setupCurrentTrack() {
    this.currentTrack$
      .pipe(
        filter((track) => !!track),
        map(
          (track) =>
            ({
              type: "video",
              title: track.name,
              sources: [
                {
                  src: track.path,
                  type: `video/${
                    track.path.toLowerCase().endsWith(".webm") ? "webm" : "mp4"
                  }`,
                  size: track.size,
                },
              ],
            } as Plyr.SourceInfo)
        ),
        exhaustMap((track) => {
          this.plyr.source = track;
          return scheduled([this.plyr.play()], asapScheduler);
        }),
        catchError(() => {
          return scheduled([null], asapScheduler);
        }),
        takeUntil(this.destroy$)
      )
      .subscribe();
  }
}
