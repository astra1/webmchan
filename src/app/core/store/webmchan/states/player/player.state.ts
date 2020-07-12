import { Action, Selector, State, StateContext } from "@ngxs/store";
import { IFile } from "../../../../models/models";
import {
  SetIsPlaying,
  SetPlaylist,
  SetCurrentTrack,
  NextTrack,
  PrevTrack,
  SetShuffle,
  SetFullscreen,
  SetCurrentTrackTime,
  SetVolumeLevel,
  SetCurrentTrackTimeLength,
} from "./player.actions";
import { Injectable } from "@angular/core";

export interface PlayerStateModel {
  queue: IFile[]; // todo: to sub state?
  currentTrack: IFile | null;

  volumeLevel: number;

  isPlaying: boolean;
  isShuffleOn: boolean;
  isFullscreenOn: boolean;

  currentTrackTime: number;
  currentTrackTimeLength: number;
}

@State<PlayerStateModel>({
  name: "player",
  defaults: {
    currentTrack: null,
    currentTrackTime: 0,
    volumeLevel: 100,
    isPlaying: false,
    isFullscreenOn: false,
    isShuffleOn: false,
    queue: [],
    currentTrackTimeLength: 0,
  },
})
@Injectable({
  providedIn: "root",
})
export class PlayerState {
  @Selector()
  static isPlaying(state: PlayerStateModel) {
    return state.isPlaying;
  }

  @Selector()
  static currentTrack(state: PlayerStateModel) {
    return state.currentTrack;
  }

  @Selector()
  static currentTrackTime(state: PlayerStateModel) {
    return state.currentTrackTime;
  }

  @Selector()
  static currentTrackLength(state: PlayerStateModel) {
    return state.currentTrackTimeLength;
  }

  @Selector()
  static volumeLevel(state: PlayerStateModel) {
    return state.volumeLevel;
  }

  @Action(SetIsPlaying)
  setIsPlaying(
    { patchState }: StateContext<PlayerStateModel>,
    { payload }: SetIsPlaying
  ) {
    patchState({
      isPlaying: payload,
    });
  }

  @Action(SetShuffle)
  setShuffle(
    { patchState }: StateContext<PlayerStateModel>,
    { payload }: SetShuffle
  ) {
    patchState({
      isShuffleOn: payload,
    });
  }

  @Action(SetFullscreen)
  setFullscreen(
    { patchState }: StateContext<PlayerStateModel>,
    { payload }: SetFullscreen
  ) {
    patchState({
      isFullscreenOn: payload,
    });
  }

  @Action(SetCurrentTrackTime)
  setCurrentTrackTime(
    { patchState }: StateContext<PlayerStateModel>,
    { payload }: SetCurrentTrackTime
  ) {
    patchState({
      currentTrackTime: payload,
    });
  }

  @Action(SetCurrentTrackTimeLength)
  setCurrentTrackLength(
    { patchState }: StateContext<PlayerStateModel>,
    { payload }: SetCurrentTrackTimeLength
  ) {
    patchState({
      currentTrackTimeLength: payload,
    });
  }

  @Action(SetPlaylist)
  setPlaylist(
    { patchState }: StateContext<PlayerStateModel>,
    { payload }: SetPlaylist
  ) {
    patchState({
      queue: payload,
    });
  }

  @Action(SetVolumeLevel)
  setVolumeLevel(
    { patchState }: StateContext<PlayerStateModel>,
    { payload }: SetVolumeLevel
  ) {
    patchState({
      volumeLevel: payload,
    });
  }

  @Action(SetCurrentTrack)
  setCurrentTrack(
    { patchState }: StateContext<PlayerStateModel>,
    { payload }: SetCurrentTrack
  ) {
    patchState({
      currentTrack: payload,
    });
  }

  @Action(NextTrack)
  nextTrack({ getState, dispatch }: StateContext<PlayerStateModel>) {
    const state = getState();

    if (!state.queue.length) {
      throw new Error("Cannot change next track on empty queue");
    }

    let nextTrack = state.queue[0];
    if (state.currentTrack) {
      const trackIndex = state.queue.indexOf(state.currentTrack);
      if (state.queue[trackIndex + 1]) {
        nextTrack = state.queue[trackIndex + 1];
      }
    }
    dispatch(new SetCurrentTrack(nextTrack));
  }

  @Action(PrevTrack)
  prevTrack({ getState, dispatch }: StateContext<PlayerStateModel>) {
    const state = getState();

    if (!state.queue.length) {
      throw new Error("Cannot change previous track on empty queue");
    }

    let nextTrack = state.queue[0];
    if (state.currentTrack) {
      const trackIndex = state.queue.indexOf(state.currentTrack);
      if (state.queue[trackIndex - 1]) {
        nextTrack = state.queue[trackIndex - 1];
      }
    }
    dispatch(new SetCurrentTrack(nextTrack));
  }
}
