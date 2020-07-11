import { SidenavStateService } from "./../../core/services/sidenav-state.service";
import { Component, OnInit, OnDestroy } from "@angular/core";
import { Location } from "@angular/common";
import { Subject, Observable } from "rxjs";
import { map, tap } from "rxjs/operators";

import { IPost, IFile } from "../../core/models/models";
import { faPlay, faVideo, faBars } from "@fortawesome/free-solid-svg-icons";
import { PlayerService } from "../../core/services/player.service";
import { Select } from "@ngxs/store";
import { ThreadState } from "../../core/store/imageboard/thread/thread.state";

@Component({
  selector: "app-thread",
  templateUrl: "./thread.component.html",
  styleUrls: ["./thread.component.scss"],
})
export class ThreadComponent implements OnInit, OnDestroy {
  thread_num = "";

  // fontawesome icons
  faBars = faBars;
  faPlay = faPlay;
  faVideo = faVideo;

  lastUpdated: Date = null;

  destroy$: Subject<boolean> = new Subject<boolean>();

  @Select(ThreadState.currentThreadPosts) posts$: Observable<IPost[]>;

  videos$: Observable<IFile[]> = this.posts$.pipe(
    map((posts) => posts.reduce((prev, curr) => [...prev, ...curr.files], [])),
    tap((files) => console.warn("he", files))
  );

  videos: IFile[] = [];

  loading = false;

  constructor(
    private location: Location,
    private ps: PlayerService,
    private sidenavState: SidenavStateService
  ) {}

  ngOnInit() {}

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  getThreadThumbnail(file: IFile) {
    return file ? `url(https://2ch.hk${file.thumbnail})` : "";
  }

  goBack() {
    this.location.back();
  }

  renew() {}

  onPlayClick(file: IFile) {
    this.ps.playFile(file);
  }

  onPlayAllClick() {
    this.ps.setPlaysist(this.videos);
    this.ps.playAll();
  }

  toggleSidenav() {
    this.sidenavState.toggle();
  }

  trackByFileId(index: number, item: IFile) {
    return item.name;
  }
}
