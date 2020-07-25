import { SettingsService } from "./settings/settings.service";
import { Component, OnInit, ViewChild, ViewEncapsulation } from "@angular/core";

import { ElectronService } from "./core/services/electron.service";
import { SidenavStateService } from "./core/services/sidenav-state.service";

import { MatSidenav } from "@angular/material/sidenav";

import { distinctUntilChanged } from "rxjs/operators";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { Select, Store } from "@ngxs/store";
import { GetBoards } from "./core/store/imageboard/board/board.actions";
import { Location } from "@angular/common";
import { ThreadState } from "./core/store/imageboard/thread/thread.state";
import { Observable } from "rxjs";
import { BoardState } from "./core/store/imageboard/board/board.state";
import { ActivatedRoute, ActivatedRouteSnapshot } from "@angular/router";
import { SetCurrentThread } from "./core/store/imageboard/thread/thread.actions";
import { SetCurrentTrack } from "./core/store/webmchan/states/player/player.actions";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
  encapsulation: ViewEncapsulation.None,
})
export class AppComponent implements OnInit {
  @ViewChild("sidenav", { static: true }) sidenav: MatSidenav;

  @Select(BoardState.currentBoard) currentBoard$: Observable<string>;
  @Select(ThreadState.currentThread) currentThread$: Observable<string>;
  @Select(ThreadState.currentThreadTitle) threadTitle$: Observable<string>;

  title = "app";
  faBack = faArrowLeft;

  constructor(
    es: ElectronService,
    private settingsService: SettingsService,
    private sidenavState: SidenavStateService,
    private location: Location,
    private store: Store,
    private route: ActivatedRoute
  ) {
    if (es.isElectron()) {
      console.log("Mode electron");
      console.log("Electron ipcRenderer", es.ipcRenderer);
      console.log("NodeJS childProcess", es.childProcess);
    } else {
      console.log("Mode web");
    }

    this.settingsService.load();
  }

  ngOnInit() {
    this.store.dispatch(new GetBoards());

    this.sidenavState.isOpened.pipe(distinctUntilChanged()).subscribe((val) => {
      val ? this.sidenav.open() : this.sidenav.close();
    });
  }

  onSidenavClosed() {
    this.sidenavState.setState(false);
  }

  goBack() {
    const params = this.route.snapshot.firstChild?.paramMap;
    if (params.has("thread_id")) {
      this.store.dispatch(new SetCurrentThread(null));
      this.store.dispatch(new SetCurrentTrack(null));
    }
    this.location.back();
  }
}
