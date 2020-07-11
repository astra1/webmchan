import { IThread, IPost } from "../../../models/models";

export class SetCurrentThread {
  static readonly type = "[Thread] Set Current";
  constructor(public payload: string) {}
}

export class SetThreads {
  static readonly type = "[Thread] Set Items";
  constructor(public payload: IThread[]) {}
}

export class GetThreads {
  static readonly type = "[Thread] Get Items";
  constructor() {}
}

export class GetPosts {
  static readonly type = "[Posts] Set Thread Posts";
  constructor() {}
}
