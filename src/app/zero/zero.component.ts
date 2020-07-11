import { SidenavStateService } from "./../core/services/sidenav-state.service";
import { environment } from "./../../environments/environment";
import { ApiService } from "./../core/services/Api.service";
import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  OnDestroy,
} from "@angular/core";
import { Observable, timer, Subject } from "rxjs";
import { IThread } from "../core/models/models";
import { tap, switchMap, takeUntil } from "rxjs/operators";
import { faBars, faBolt } from "@fortawesome/free-solid-svg-icons";
import { ActivatedRoute } from "@angular/router";
import { Store, Select } from "@ngxs/store";
import { SetCurrentBoard } from "../core/store/imageboard/board/board.actions";
import { GetThreads } from "../core/store/imageboard/thread/thread.actions";
import { ThreadState } from "../core/store/imageboard/thread/thread.state";

@Component({
  selector: "app-zero",
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: "./zero.component.html",
  styleUrls: ["./zero.component.scss"],
})
export class ZeroComponent implements OnInit, OnDestroy {
  isThreadImgPreviewOpen = false;
  cols = 3;

  // fontawesome
  faBars = faBars;
  faBolt = faBolt;

  @Select(ThreadState.threadList) threads$: Observable<IThread[]>;
  // threads$: Observable<IThread[]>;
  destroy$: Subject<void> = new Subject();

  constructor(
    private api: ApiService,
    private route: ActivatedRoute,
    private store: Store,
    private sidenavService: SidenavStateService
  ) {}

  ngOnInit() {
    // const boardId = this.route.snapshot.params["board_id"];
    // this.store.dispatch(new SetCurrentBoard(boardId));
    // this.store.dispatch(new GetThreads());
    // this.threads$ = timer(0, 10000).pipe(
    //   takeUntil(this.destroy$),
    //   switchMap(() =>
    //     this.api.getThreads(this.route.snapshot.params["board_id"])
    //   ),
    //   tap((val) => console.log("threads updated. amount: " + val && val.length))
    // );
  }

  getThreadThumbnail(thread: IThread) {
    const file = thread.files[0];
    return file ? `${environment.dvachApiUrl}${file.thumbnail}` : "";
  }

  getThreadImage(thread: IThread) {
    const file = thread.files[0];

    if ((file && file.type === 10) || file.type === 6) {
      return `${environment.dvachApiUrl}${file.thumbnail}`;
    }

    return file ? `${environment.dvachApiUrl}${file.path}` : "";
  }

  toggleSidenav() {
    this.sidenavService.toggle();
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
