import {
  Component,
  ElementRef,
  EventEmitter,
  OnInit,
  Output,
  ViewChild,
} from "@angular/core";
import { Actions, ofActionSuccessful, Select, Store } from "@ngxs/store";
import {
  NextTrack,
  SetCurrentTrackTime,
  SetCurrentTrackTimeLength,
  SetFullscreen,
} from "app/core/store/webmchan/states/player/player.actions";
import { PlayerState } from "app/core/store/webmchan/states/player/player.state";
import { asapScheduler, defer, Observable, scheduled } from "rxjs";
import {
  catchError,
  distinctUntilChanged,
  exhaustMap,
  filter,
  mergeMap,
  pluck,
  switchMap,
  tap,
} from "rxjs/operators";
import { IFile } from "../../../core/models/models";
import { PlayerService } from "../../../core/services/player.service";

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

  @Output()
  played: EventEmitter<number> = new EventEmitter();

  get htmlVideo(): HTMLVideoElement {
    return this.videoRef?.nativeElement as HTMLVideoElement;
  }

  constructor(
    public playerService: PlayerService,
    private store: Store,
    private actions$: Actions
  ) {
    this.createHotkeyHooks();
  }

  ngOnInit() {
    this.currentTrack$
      .pipe(
        filter((track) => !!track),
        tap(() => this.htmlVideo.load()),
        catchError(() => {
          return scheduled([null], asapScheduler);
        }),
        exhaustMap((track) => {
          // this.htmlVideo.pause();
          // this.htmlVideo.setAttribute("src", track.path);
          // this.htmlVideo.poster = "https://2ch.hk" + track.thumbnail;
          // this.htmlVideo.focus();
          return scheduled(
            [
              this.htmlVideo.play(), // ignore: load/play annoying error
            ],
            asapScheduler
          );
        }),
        catchError((err) => {
          return scheduled([null], asapScheduler);
        })
      )
      .subscribe();

    this.volumeLevel$
      .pipe(filter((lvl) => lvl >= 0 && lvl <= 100))
      .subscribe((level) => (this.htmlVideo.volume = level / 100));

    this.isPlaying$
      .pipe(
        distinctUntilChanged(),
        mergeMap((playing) =>
          defer(() =>
            playing
              ? scheduled([this.htmlVideo.play()], asapScheduler)
              : this.htmlVideo.pause()
          )
        )
      )
      .subscribe();

    this.actions$
      .pipe(
        ofActionSuccessful(SetFullscreen),
        pluck("payload"),
        switchMap(() => this.htmlVideo.requestFullscreen())
      )
      .subscribe();
  }

  createHotkeyHooks() {}

  onEnded() {
    this.store.dispatch(new NextTrack());
  }

  onTimeUpdated() {
    this.store.dispatch(new SetCurrentTrackTime(this.htmlVideo.currentTime));
  }

  onLoaded() {
    this.store.dispatch(new SetCurrentTrackTimeLength(this.htmlVideo.duration));
  }

  // setLoading(state: boolean) {
  //   this.loading = state;
  // }
}
