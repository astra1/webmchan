import { State } from "@ngxs/store";
import { BoardState } from "./board/board.state";
import { ThreadState } from "./thread/thread.state";
import { Injectable } from "@angular/core";

export const ImageboardStates = [BoardState, ThreadState];

@State({
  name: "imageboardStateModule",
  children: ImageboardStates,
})
@Injectable()
export class ImageboardStateModule {}
