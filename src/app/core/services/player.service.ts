import { IFile } from "./../models/models";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Select, Store, Actions } from "@ngxs/store";
import { PlayerState } from "../store/webmchan/states/player/player.state";

@Injectable({
  providedIn: "root",
})
export class PlayerService {
  @Select(PlayerState.currentTrack)
  currentTrack$: Observable<IFile>;

  private videoObj: HTMLVideoElement;
  constructor() {
    // this.createVideoObject();
    // this.currentTrack$.pipe(filter((track) => !!track)).subscribe((track) => {
    //   console.warn("cur", track);
    //   this.videoObj.src = `https://2ch.hk${track.path}`;
    // });
    // fromEvent(this.videoObj, "ontimeupdate").subscribe(() =>
    //   this.store.dispatch(new SetCurrentTrackTime(this.videoObj.currentTime))
    // );
    // this.actions$
    //   .pipe(ofActionSuccessful(SetIsPlaying))
    //   .subscribe((isPlaying) =>
    //     isPlaying ? this.videoObj.play() : this.videoObj.pause()
    //   );
  }

}
