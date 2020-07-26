import { SettingsService, ISettings } from "./../settings/settings.service";
import { DownloadService } from "./../core/services/download.service";
import { environment } from "./../../environments/environment";
import { PlayerService } from "./../core/services/player.service";
import { IFile } from "./../core/models/models";
import { Component, OnInit, HostListener } from "@angular/core";
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
import { ElectronService } from "../core/services/electron.service";
import { MatDialog } from "@angular/material/dialog";
import { CopyUrlDialogComponent } from "./copy-url-dialog/copy-url-dialog.component";
import { Select, Store } from "@ngxs/store";
import { PlayerState } from "app/core/store/webmchan/states/player/player.state";
import { Observable } from "rxjs";
import {
  NextTrack,
  PrevTrack,
  SetFullscreen,
  SetIsPlaying,
} from "app/core/store/webmchan/states/player/player.actions";

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

  currentTime = 0;
  trackLength = 1;

  currentTrack: IFile = null;

  isPlaying = false;
  isShuffled = false;

  @Select(PlayerState.currentTrack)
  currentTrack$: Observable<IFile>;
  @Select(PlayerState.currentTrackTime)
  currentTime$: Observable<number>;
  @Select(PlayerState.currentTrackLength)
  currentTrackLength$: Observable<
    number
  >;
  @Select(PlayerState.isPlaying)
  isPlaying$: Observable<boolean>;

  constructor(
    public dlg: MatDialog,
    private downService: DownloadService,
    private electronService: ElectronService,
    private playerService: PlayerService,
    private store: Store,
    private settingsService: SettingsService,
  ) {}

  @HostListener("window:keydown", ["$event"])
  onKeyDown(event) {}

  ngOnInit() {
    this.isNative = this.electronService.isElectron() || false;
  }

  getTrackThumb() {
    return this.currentTrack?.thumbnail !== ""
      ? this.currentTrack.thumbnail
      : "./assets/icons/webmchan.svg";
  }

  onTimeSelect(seconds: number) {
    // this.playerService.setTime(seconds);
  }

  updateTime(seconds: number) {
    this.currentTime = seconds;
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

  copyUrlClick() {
    const dialogRef = this.dlg.open(CopyUrlDialogComponent, {
      width: "21.875rem",
      data: {
        title: this.currentTrack.name,
        url: "https://2ch.hk" + this.currentTrack.path,
      },
    });

    dialogRef.afterClosed().subscribe((res) => {
      console.log("dialog was closed", res);
    });
  }

  saveVideo() {
    if (this.electronService.isElectron()) {
      this.settingsService.get().subscribe((settings: ISettings) => {
        let path: string = settings.savePath;
        if (!this.electronService.fs.existsSync(path)) {
          path = this.electronService.remote.app.getPath("desktop");
        }

        let filePath = this.showSaveDlg(path);
        if (filePath) {
          this.downloadAndWriteVideo(filePath);
        }
      });
    }
  }

  private showSaveDlg(path: string) {
    return this.electronService.remote.dialog.showSaveDialog({
      defaultPath: path + "/" + this.currentTrack.fullname,
      filters: [
        {
          name: this.currentTrack.name,
          extensions: ["webm", "mp4"],
        },
      ],
      title: "Saving VIDOSIQUE",
    });
  }

  private downloadAndWriteVideo(filePath) {
    this.downService
      .download("https://2ch.hk" + this.currentTrack.path)
      .subscribe((val) => {
        if (val) {
          this.electronService.fs.writeFileSync(filePath, Buffer.from(val));
        }
      });
  }
}
