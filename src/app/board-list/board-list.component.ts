import { SidenavStateService } from "./../core/services/sidenav-state.service";
import {
  faBars,
  faBolt,
  faBook,
  faEnvelope,
} from "@fortawesome/free-solid-svg-icons";
import { ApiService } from "./../core/services/Api.service";
import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
} from "@angular/core";
import { IBoard } from "../core/models/models";
import { SettingsService } from "../settings/settings.service";
import { Observable } from "rxjs";
import { Store, Select } from "@ngxs/store";
import { BoardState } from "../core/store/imageboard/board/board.state";
import { GetBoards } from "../core/store/imageboard/board/board.actions";

@Component({
  selector: "app-board-list",
  templateUrl: "./board-list.component.html",
  styleUrls: ["./board-list.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BoardListComponent implements OnInit {
  nswf = false;
  @Select(BoardState.boardList) boards$: Observable<IBoard[]>;

  faBars = faBars;
  faBolt = faBolt;
  faBook = faBook;
  faEnvelope = faEnvelope;

  constructor(private store: Store) {}

  ngOnInit() {}

  renew() {
    console.log("not renew");
  }
}
