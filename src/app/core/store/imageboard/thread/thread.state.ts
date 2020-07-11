import { IThread } from "../../../models/models";
import { State, Selector, Action, StateContext } from "@ngxs/store";
import { SetCurrentThread, SetThreads } from "./thread.actions";

export interface ThreadStateModel {
  currentThread?: IThread;
  items: IThread[];
}

@State<ThreadStateModel>({
  name: "thread",
  defaults: {
    currentThread: null,
    items: [],
  },
})
export class ThreadState {
  @Selector()
  static getCurrentThread(state: ThreadStateModel) {
    return state.currentThread;
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
}
