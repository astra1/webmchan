import { IBoard } from "../../../models/models";

export class SetCurrentBoard {
  static readonly type = "[Board] Set Current";
  constructor(public payload: IBoard) {}
}

export class SetBoards {
  static readonly type = "[Board] Set Items";
  constructor(public payload: IBoard[]) {}
}
