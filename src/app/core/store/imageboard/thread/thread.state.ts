import { IThread, IPost } from "../../../models/models";
import { State, Selector, Action, StateContext, Store } from "@ngxs/store";
import {
  SetCurrentThread,
  SetThreads,
  GetThreads,
  GetPosts,
} from "./thread.actions";
import { Injectable } from "@angular/core";
import { ApiService } from "../../../services/Api.service";
import { BoardState } from "../board/board.state";
import { tap } from "rxjs/operators";

export interface ThreadStateModel {
  currentThread: string | null;
  items: IThread[];
  currentThreadPosts: IPost[];
}

@State<ThreadStateModel>({
  name: "thread",
  defaults: {
    currentThread: null,
    items: [],
    currentThreadPosts: [],
  },
})
@Injectable()
export class ThreadState {
  constructor(private apiService: ApiService, private store: Store) {}

  @Selector()
  static currentThread(state: ThreadStateModel) {
    return state.currentThread;
  }

  @Selector()
  static threadList(state: ThreadStateModel) {
    return state.items;
  }

  @Selector()
  static currentThreadTitle(state: ThreadStateModel) {
    const threadName =
      state.currentThread &&
      state.items.find((i) => i.num === state.currentThread).subject;

    return threadName;
  }

  @Selector()
  static currentThreadPosts(state: ThreadStateModel) {
    return state.currentThreadPosts;
  }

  @Action(SetCurrentThread)
  setThread(
    ctx: StateContext<ThreadStateModel>,
    { payload }: SetCurrentThread
  ) {
    ctx.patchState({
      currentThread: payload,
    });
  }

  @Action(SetThreads)
  setThreadList(ctx: StateContext<ThreadStateModel>, { payload }: SetThreads) {
    ctx.patchState({
      items: payload,
    });
  }

  @Action(GetPosts)
  getPosts(ctx: StateContext<ThreadStateModel>) {
    const currentBoard = this.store.selectSnapshot(BoardState.currentBoard);
    return this.apiService
      .getPosts(currentBoard, ctx.getState().currentThread)
      .pipe(
        tap((posts) =>
          ctx.patchState({
            currentThreadPosts: posts,
          })
        )
      );
  }

  @Action(GetThreads)
  getThreadList(ctx: StateContext<ThreadStateModel>) {
    const currentBoard = this.store.selectSnapshot(BoardState.currentBoard);
    return this.apiService
      .getThreads(currentBoard)
      .pipe(tap((threads) => ctx.patchState({ items: threads })));
  }
}
