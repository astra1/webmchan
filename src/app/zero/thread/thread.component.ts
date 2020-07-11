import { SidenavStateService } from "./../../core/services/sidenav-state.service";
import { environment } from "./../../../environments/environment";
import { ApiService } from "./../../core/services/Api.service";
import { Component, OnInit, OnDestroy } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Location } from "@angular/common";
import { Subject, of, timer } from "rxjs";
import {
  pluck,
  filter,
  flatMap,
  catchError,
  takeUntil,
  switchMap,
  map,
  tap,
} from "rxjs/operators";

import { IPost, IFile } from "../../core/models/models";
import { faPlay, faVideo, faBars } from "@fortawesome/free-solid-svg-icons";
import { PlayerService } from "../../core/services/player.service";

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

  posts: IPost[] = null;
  videos: IFile[] = [];

  loading = false;

  constructor(
    private api: ApiService,
    private location: Location,
    private ps: PlayerService,
    private route: ActivatedRoute,
    private sidenavState: SidenavStateService
  ) {}

  ngOnInit() {
    this.route.params
      .pipe(
        takeUntil(this.destroy$),
        tap((val) => console.log(val)),
        pluck("thread_id"),
        filter((val) => !!val),
        flatMap((val: string) => {
          this.loading = true;
          this.thread_num = val;
          return this.api.getPosts(this.route.snapshot.params["board_id"], val);
        }),
        catchError(() => of([]))
      )
      .subscribe((posts: IPost[]) => {
        this.updateData(posts);
      });

    // autoupdate
    if (environment.production) {
      timer(10000, 10000)
        .pipe(
          takeUntil(this.destroy$),
          switchMap(() =>
            this.api.getPosts(
              this.route.snapshot.params["board_id"],
              this.thread_num
            )
          ),
          map((val) => this.updateData(val))
        )
        .subscribe(() => {
          console.log("auto_update");
        });
    }
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  private updateData(posts: IPost[]) {
    this.lastUpdated = new Date();
    this.posts = posts;

    this.videos = posts
      .reduce((prev, curr) => {
        return [...prev, ...curr.files];
      }, [])
      .filter((f: IFile) => f.duration_secs);

    this.ps.setPlaysist(this.videos);
    this.loading = false;
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
}
