import { Injectable } from "@angular/core";
import {
  Resolve,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from "@angular/router";
import { Store, Select } from "@ngxs/store";
import { IPost } from "../models/models";
import {
  SetCurrentThread,
  GetPosts,
} from "../store/imageboard/thread/thread.actions";
import { ThreadState } from "../store/imageboard/thread/thread.state";
import { BoardState } from "../store/imageboard/board/board.state";
import { SetCurrentBoard } from "../store/imageboard/board/board.actions";
import { Observable } from "rxjs";
import { withLatestFrom, map } from "rxjs/operators";

@Injectable()
export class PostsResolver implements Resolve<IPost[]> {
  @Select(ThreadState.currentThreadPosts) posts$: Observable<IPost[]>;

  constructor(private store: Store) {}
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const stateCurrentBoard = this.store.selectSnapshot(
      BoardState.currentBoard
    );

    if (!stateCurrentBoard && route.paramMap.get("board_id")) {
      this.store.dispatch(new SetCurrentBoard(route.paramMap.get("board_id")));
    }

    this.store.dispatch(new SetCurrentThread(route.paramMap.get("thread_id")));
    return this.store.dispatch(new GetPosts()).pipe(
      withLatestFrom(this.posts$),
      map(([, posts]) => posts)
    );
  }
}
