import { Component, HostListener, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import {
  faCompress,
  faEllipsisV,
  faLink,
  faPause,
  faPlay,
  faRandom,
  faRedo,
  faSave,
  faStepBackward,
  faStepForward,
  faStop,
} from "@fortawesome/free-solid-svg-icons";
import { Select, Store } from "@ngxs/store";
import {
  NextTrack,
  PrevTrack,
  SetCustomTrackTime,
  SetFullscreen,
  SetIsPlaying,
} from "app/core/store/webmchan/states/player/player.actions";
import { PlayerState } from "app/core/store/webmchan/states/player/player.state";
import { Observable } from "rxjs";
import { filter, map, mergeMap } from "rxjs/operators";
import { ElectronService } from "../core/services/electron.service";
import { IFile } from "./../core/models/models";
import { DownloadService } from "./../core/services/download.service";
import { SettingsService } from "./../settings/settings.service";
import { CopyUrlDialogComponent } from "./copy-url-dialog/copy-url-dialog.component";

@Component({
  selector: "app-player-control",
  templateUrl: "./player-control.component.html",
  styleUrls: ["./player-control.component.scss"],
})
export class PlayerControlComponent implements OnInit {
  isNative = false;

  faDots = faEllipsisV;
  faFullscreen = faCompress;
  faLink = faLink;
  faPlay = faPlay;
  faPause = faPause;
  faRandom = faRandom;
  faRedo = faRedo;
  faSave = faSave;
  faStepBack = faStepBackward;
  faStepForw = faStepForward;
  faStop = faStop;

  @Select(PlayerState.currentTrack)
  currentTrack$: Observable<IFile>;
  @Select(PlayerState.currentTrackTime)
  currentTime$: Observable<number>;
  @Select(PlayerState.currentTrackLength)
  currentTrackLength$: Observable<number>;
  @Select(PlayerState.isPlaying)
  isPlaying$: Observable<boolean>;

  constructor(
    public dlg: MatDialog,
    private downService: DownloadService,
    private electronService: ElectronService,
    private store: Store,
    private settingsService: SettingsService
  ) {}

  @HostListener("window:keydown", ["$event"])
  onKeyDown() {}

  ngOnInit() {
    this.isNative = this.electronService.isElectron() || false;
  }

  getTrackThumb(track: IFile) {
    return track.thumbnail ? track.thumbnail : "assets/icons/webmchan.svg";
  }

  onTimeSelect(seconds: number) {
    this.store.dispatch(new SetCustomTrackTime(seconds));
  }

  playNext() {
    this.store.dispatch(new NextTrack());
  }

  playPrev() {
    this.store.dispatch(new PrevTrack());
  }

  play() {
    const isPlaying = this.store.selectSnapshot(PlayerState.isPlaying);
    this.store.dispatch(new SetIsPlaying(!isPlaying));
  }

  stop() {}

  toggleShuffle() {
    // this.playerService.toggleShuffle();
  }

  toggleFullscreen() {
    // todo: handle un_fullscreen & save to state
    this.store.dispatch(new SetFullscreen(true));
  }

  copyUrlClick({ name, path }: IFile) {
    const dialogRef = this.dlg.open(CopyUrlDialogComponent, {
      width: "21.875rem",
      data: {
        title: name,
        url: path,
      },
    });

    dialogRef.afterClosed().subscribe((res) => {
      console.log("dialog was closed", res);
    });
  }

  saveVideo(track: IFile) {
    if (this.electronService.isElectron()) {
      this.settingsService
        .get()
        .pipe(
          map((settings) => {
            let path: string = settings.savePath;
            if (!this.electronService.fs.existsSync(path)) {
              path = this.electronService.app.getPath("desktop");
            }
            return path;
          }),
          mergeMap((path) => this.showSaveDlg(path, track)),
          map((saveDlgData) => saveDlgData.filePath),
          filter((filepath) => !!filepath),
          mergeMap((filepath) =>
            this.downService.download(track.path).pipe(
              map((buff) => ({
                filepath,
                buff,
              }))
            )
          ),
          filter((data) => !!data.buff && !!data.filepath),
          mergeMap((data) =>
            this.electronService.fs.promises.writeFile(data.filepath, new Uint8Array(data.buff))
          )
        )
        .subscribe();
    }
  }

  private showSaveDlg(path: string, track: IFile) {
    return this.electronService.dialog.showSaveDialog({
      defaultPath: `${path}/${track.fullname}`,
      filters: [
        {
          name: track.name,
          extensions: ["webm", "mp4"],
        },
      ],
      title: "Saving VIDOSIQUE",
    });
  }
}
