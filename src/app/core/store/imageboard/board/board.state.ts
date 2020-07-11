import { IBoard } from "../../../models/models";
import { State, Selector, Action, StateContext } from "@ngxs/store";
import { SetBoards, SetCurrentBoard } from "./board.actions";

export interface BoardStateModel {
  currentBoard?: IBoard;
  items: IBoard[];
}

@State<BoardStateModel>({
  name: "board",
  defaults: {
    currentBoard: null,
    items: [],
  },
})
export class BoardState {
  @Selector()
  static boardList(state: BoardStateModel) {
    return state.items;
  }

  @Selector()
  static currentBoard(state: BoardStateModel) {
    return state.currentBoard;
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
      currentBoard: payload,
    });
  }
}
