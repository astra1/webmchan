import { SettingsService } from "./settings/settings.service";
import { Component, OnInit, ViewChild, ViewEncapsulation } from "@angular/core";

import { ElectronService } from "./core/services/electron.service";
import { SidenavStateService } from "./core/services/sidenav-state.service";

import { MatSidenav } from "@angular/material/sidenav";

import { distinctUntilChanged, pluck } from "rxjs/operators";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { Store, Actions, ofActionSuccessful } from "@ngxs/store";
import {
  GetBoards,
  SetCurrentBoard,
} from "./core/store/imageboard/board/board.actions";
import { ParamMap } from "@angular/router";
import { SetCurrentThread } from "./core/store/imageboard/thread/thread.actions";
import { RouterDataResolved } from "@ngxs/router-plugin";
import { Location } from "@angular/common";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
  encapsulation: ViewEncapsulation.None,
})
export class AppComponent implements OnInit {
  @ViewChild("sidenav", { static: true }) sidenav: MatSidenav;
  title = "app";
  faBack = faArrowLeft;

  constructor(
    es: ElectronService,
    private settingsService: SettingsService,
    private sidenavState: SidenavStateService,
    private actions: Actions,
    private location: Location,
    private store: Store
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

    this.actions
      .pipe(
        ofActionSuccessful(RouterDataResolved),
        pluck("routerState", "root", "firstChild", "paramMap")
      )
      .subscribe((paramMap: ParamMap) => {
        if (paramMap.get("board_id")) {
          this.store.dispatch(new SetCurrentBoard(paramMap.get("board_id")));
        }
        if (paramMap.get("thread_id")) {
          this.store.dispatch(new SetCurrentThread(paramMap.get("thread_id")));
        }
      });

    this.sidenavState.isOpened.pipe(distinctUntilChanged()).subscribe((val) => {
      val ? this.sidenav.open() : this.sidenav.close();
    });
  }

  onSidenavClosed() {
    this.sidenavState.setState(false);
  }

  goBack() {
    this.location.back();
  }
}
