import { IFile } from "../../../../models/models";

export class SetIsPlaying {
  static readonly type = "[Player] Set isPlaying";
  constructor(public payload: boolean) {}
}

export class SetVolumeLevel {
  static readonly type = "[Player] Set Volume Level";
  constructor(public payload: number) {}
}

export class SetPlaylist {
  static readonly type = "[Player] Set Playlist";
  constructor(public payload: IFile[]) {}
}

export class SetCurrentTrack {
  static readonly type = "[Player] Set track";
  constructor(public payload: IFile) {}
}

export class NextTrack {
  static readonly type = "[Player] Next track";
  constructor() {}
}

export class PrevTrack {
  static readonly type = "[Player] Prev track";
  constructor() {}
}

export class SetShuffle {
  static readonly type = "[Player] Set Shuffle";
  constructor(public payload: boolean) {}
}

export class SetFullscreen {
  static readonly type = "[Player] Set Fullscreen Model";
  constructor(public payload: boolean) {}
}

export class SetCurrentTrackTime {
  static readonly type = "[Player] Set Current Track Time";
  constructor(public payload: number) {}
}
