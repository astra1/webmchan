import { IFile } from "./../models/models";
import { Injectable } from "@angular/core";
import { Subject, BehaviorSubject, Observable, fromEvent } from "rxjs";
import { Select, Store, Actions, ofActionSuccessful } from "@ngxs/store";
import { PlayerState } from "../store/webmchan/states/player/player.state";
import {
  SetIsPlaying,
  SetCurrentTrackTime,
} from "../store/webmchan/states/player/player.actions";
import { filter } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class PlayerService {
  @Select(PlayerState.currentTrack) currentTrack$: Observable<IFile>;

  private videoObj: HTMLVideoElement;
  constructor(private actions$: Actions, private store: Store) {
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

  private createVideoObject() {
    const videoObj = document.createElement("video");
    const defaultVideoWidth = 600;
    const defaultVideoHeight = 400;

    // videoObj.height = defaultVideoHeight;
    // videoObj.width = defaultVideoWidth;
    videoObj.style.position = "fixed";

    var left = window.innerWidth / 2 - defaultVideoWidth / 2;
    var top = window.innerHeight / 2 - defaultVideoHeight / 2;
    videoObj.style.left = left + "px";
    videoObj.style.top = top + "px";

    videoObj.style.zIndex = "99";
    // videoObj.ontimeupdate(() => this.store.dispatch(new SetCurrentTrackTime(5)))
    this.videoObj = videoObj;
    document.body.append(this.videoObj);
  }
}
