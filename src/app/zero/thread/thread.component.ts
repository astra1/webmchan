import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { faBars, faPlay, faVideo } from "@fortawesome/free-solid-svg-icons";
import { Store } from "@ngxs/store";
import {
  SetCurrentTrack,
  SetIsPlaying,
  SetPlaylist,
} from "app/core/store/webmchan/states/player/player.actions";
import { PlayerState } from "app/core/store/webmchan/states/player/player.state";
import { Observable } from "rxjs";
import { map, pluck, tap } from "rxjs/operators";
import { FileTypeEnum, IFile, IPost } from "../../core/models/models";
import { SidenavStateService } from "./../../core/services/sidenav-state.service";

@Component({
  selector: "app-thread",
  templateUrl: "./thread.component.html",
  styleUrls: ["./thread.component.scss"],
})
export class ThreadComponent implements OnInit {
  thread_num = "";

  // fontawesome icons
  faBars = faBars;
  faPlay = faPlay;
  faVideo = faVideo;

  lastUpdated: Date = null;

  videos$: Observable<IFile[]>;
  loading = false;

  constructor(
    private route: ActivatedRoute,
    private sidenavState: SidenavStateService,
    private store: Store
  ) {}

  ngOnInit() {
    this.videos$ = this.route.data.pipe(
      pluck("posts"),
      map<IPost[], IFile[]>((posts) =>
        posts.reduce((prev, curr) => [...prev, ...curr.files], [])
      ),
      map((files) =>
        files.filter(
          (f) => f.type === FileTypeEnum.MP4 || f.type === FileTypeEnum.WEBM
        )
      ),
      tap((files) => {
        const playlist = this.store.selectSnapshot(PlayerState.playlist);
        if (!playlist.length) {
          this.store.dispatch(new SetPlaylist(files)); // todo: make more appropriate the playlist handling
        }
      })
    );
  }

  getThreadThumbnail(file: IFile) {
    return encodeURI(file.thumbnail);
  }

  renew() {}

  onPlayClick(file: IFile) {
    this.store.dispatch(new SetCurrentTrack(file));
    this.store.dispatch(new SetIsPlaying(true));
  }

  onPlayAllClick() {
    // this.ps.playAll();
  }

  toggleSidenav() {
    this.sidenavState.toggle();
  }

  trackByFileId(item: IFile) {
    return item.name;
  }
}
