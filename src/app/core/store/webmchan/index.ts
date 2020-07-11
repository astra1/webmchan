import { PlayerState } from "./states/player/player.state";
import { State } from "@ngxs/store";

export const WebmchanStates = [PlayerState];

@State({
  name: "webmchanStateModule",
  children: WebmchanStates,
})
export class WebmchanStateModule {}
