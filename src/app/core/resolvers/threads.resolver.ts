import { Injectable } from "@angular/core";
import {
  Resolve,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from "@angular/router";
import { Store, Select } from "@ngxs/store";
import { IThread } from "../models/models";
import { GetThreads } from "../store/imageboard/thread/thread.actions";
import { ThreadState } from "../store/imageboard/thread/thread.state";
import { SetCurrentBoard } from "../store/imageboard/board/board.actions";
import { Observable } from "rxjs";
import { withLatestFrom, map } from "rxjs/operators";

@Injectable()
export class ThreadsResolver implements Resolve<IThread[]> {
  @Select(ThreadState.threadList) threads$: Observable<IThread[]>;

  constructor(private store: Store) {}
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const boardId = route.paramMap.get("board_id");
    this.store.dispatch(new SetCurrentBoard(boardId));
    return this.store.dispatch(new GetThreads()).pipe(
      withLatestFrom(this.threads$),
      map(([, threads]) => threads)
    );
  }
}
