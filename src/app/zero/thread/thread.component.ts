import { SidenavStateService } from "./../../core/services/sidenav-state.service";
import { Component, OnInit } from "@angular/core";
import { Location } from "@angular/common";
import { Observable } from "rxjs";
import { map, pluck } from "rxjs/operators";

import { IPost, IFile } from "../../core/models/models";
import { faPlay, faVideo, faBars } from "@fortawesome/free-solid-svg-icons";
import { PlayerService } from "../../core/services/player.service";
import { ActivatedRoute } from "@angular/router";
import { Store } from "@ngxs/store";
import {
  SetIsPlaying,
  SetCurrentTrack,
} from "app/core/store/webmchan/states/player/player.actions";

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
    private location: Location,
    private ps: PlayerService,
    private sidenavState: SidenavStateService,
    private store: Store
  ) {}

  ngOnInit() {
    this.videos$ = this.route.data.pipe(
      pluck("posts"),
      map<IPost[], IFile[]>((posts) =>
        posts.reduce((prev, curr) => [...prev, ...curr.files], [])
      )
    );
  }

  getThreadThumbnail(file: IFile) {
    return encodeURI(`https://2ch.hk${file.thumbnail}`);
  }

  goBack() {
    this.location.back();
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
