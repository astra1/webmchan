import { SidenavStateService } from "./../../core/services/sidenav-state.service";
import { Component, OnInit } from "@angular/core";
import { Observable } from "rxjs";
import { map, pluck, tap } from "rxjs/operators";

import { IPost, IFile, FileTypeEnum } from "../../core/models/models";
import { faPlay, faVideo, faBars } from "@fortawesome/free-solid-svg-icons";
import { ActivatedRoute } from "@angular/router";
import { Store } from "@ngxs/store";
import {
  SetIsPlaying,
  SetCurrentTrack,
  SetPlaylist,
} from "app/core/store/webmchan/states/player/player.actions";
import { PlayerState } from "app/core/store/webmchan/states/player/player.state";

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
    return encodeURI(`https://2ch.hk${file.thumbnail}`);
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
