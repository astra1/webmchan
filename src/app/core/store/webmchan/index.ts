import { PlayerState } from "./states/player/player.state";
import { State } from "@ngxs/store";
import { Injectable } from "@angular/core";

export const WebmchanStates = [PlayerState];

@State({
  name: "webmchanStateModule",
  children: WebmchanStates,
})
@Injectable()
export class WebmchanStateModule {}
