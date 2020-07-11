import { State } from "@ngxs/store";
import { BoardState } from "./board/board.state";
import { ThreadState } from "./thread/thread.state";

export const ImageboardStates = [BoardState, ThreadState];

@State({
  name: "imageboardStateModule",
  children: ImageboardStates,
})
export class ImageboardStateModule {}
