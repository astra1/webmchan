import { IThread } from "../../../models/models";

export class SetCurrentThread {
  static readonly type = "[Thread] Set Current";
  constructor(public payload: IThread) {}
}

export class SetThreads {
  static readonly type = "[Thread] Set Items";
  constructor(public payload: IThread[]) {}
}
