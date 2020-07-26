import { IBoard } from "../../../models/models";

export class SetCurrentBoard {
  static readonly type = "[Board] Set Current Id";
  constructor(public payload: string) {}
}

export class SetBoards {
  static readonly type = "[Board] Set Items";
  constructor(public payload: IBoard[]) {}
}

export class GetBoards {
  static readonly type = "[Board] Get Items";
  constructor() {}
}
