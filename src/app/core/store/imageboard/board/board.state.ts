import { IBoard } from "../../../models/models";
import { State, Selector, Action, StateContext } from "@ngxs/store";
import { SetBoards, SetCurrentBoard, GetBoards } from "./board.actions";
import { ApiService } from "../../../services/Api.service";
import { tap } from "rxjs/operators";
import { Injectable } from "@angular/core";

export interface BoardStateModel {
  currentBoardId: string | null;
  items: IBoard[];
}

@State<BoardStateModel>({
  name: "board",
  defaults: {
    currentBoardId: null,
    items: [],
  },
})
@Injectable()
export class BoardState {
  constructor(private apiService: ApiService) {}

  @Selector()
  static boardList(state: BoardStateModel) {
    return state.items;
  }

  @Selector()
  static currentBoard(state: BoardStateModel) {
    return state.currentBoardId;
  }

  @Action(SetBoards)
  setBoardList(ctx: StateContext<BoardStateModel>, { payload }: SetBoards) {
    ctx.patchState({
      items: payload,
    });
  }

  @Action(SetCurrentBoard)
  setCurrentBoard(
    ctx: StateContext<BoardStateModel>,
    { payload }: SetCurrentBoard
  ) {
    ctx.patchState({
      currentBoardId: payload,
    });
  }

  @Action(GetBoards)
  getBoardList(ctx: StateContext<BoardStateModel>) {
    return this.apiService.getBoards().pipe(
      tap((res) =>
        ctx.patchState({
          items: res,
        })
      )
    );
  }
}
