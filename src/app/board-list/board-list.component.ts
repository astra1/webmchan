import {
  faBars,
  faBolt,
  faBook,
  faEnvelope,
} from "@fortawesome/free-solid-svg-icons";
import { Component, OnInit, ChangeDetectionStrategy } from "@angular/core";
import { IBoard } from "../core/models/models";
import { Observable } from "rxjs";
import { Select } from "@ngxs/store";
import { BoardState } from "../core/store/imageboard/board/board.state";

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

  constructor() {}

  ngOnInit() {}

  renew() {
    console.log("not renew");
  }

  trackByBoardId(item: IBoard) {
    return item.id;
  }
}
