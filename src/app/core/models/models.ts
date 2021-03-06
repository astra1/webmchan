export interface IRootObject {
  Board: string;
  BoardInfo: string;
  BoardInfoOuter: string;
  BoardName: string;
  advert_bottom_image: string;
  advert_bottom_link: string;
  advert_mobile_image: string;
  advert_mobile_link: string;
  advert_top_image: string;
  advert_top_link: string;
  board_banner_image: string;
  board_banner_link: string;
  board_speed: number;
  bump_limit: number;
  current_page: number;
  current_thread: number;
  default_name: string;
  enable_dices: number;
  enable_flags: number;
  enable_icons: number;
  enable_images: number;
  enable_likes: number;
  enable_names: number;
  enable_oekaki: number;
  enable_posting: number;
  enable_sage: number;
  enable_shield: number;
  enable_subject: number;
  enable_thread_tags: number;
  enable_trips: number;
  enable_video: number;
  is_board: number;
  is_index: number;
  max_comment: number;
  max_files_size: number;
  news_abu: INewsAbu[];
  pages: number[];
  threads: IThread[];
  top: ITop[];
}

export interface INewsAbu {
  date: string;
  num: number;
  subject: string;
  views: number;
}

export interface IThread {
  banned: number;
  closed: number;
  comment: string;
  date: string;
  email: string;
  endless: number;
  files: IFile[];
  files_count: number;
  lasthit: number;
  name: string;
  num: string;
  op: number;
  parent: string;
  posts: IPost[];
  posts_count: number;
  sticky: number;
  subject: string;
  tags: any[];
  timestamp: number;
  trip: any[];
}

export interface IPost {
  banned: number;
  closed: number;
  comment: string;
  date: string;
  email: string;
  endless: number;
  files: IFile[];
  files_count: number;
  lasthit: number;
  name: string;
  num: string;
  op: number;
  parent: string;
  posts_count: number;
  sticky: number;
  subject: string;
  tags: string;
  timestamp: number;
  trip: string;
}

export interface IFile {
  displayname: string;
  fullname: string;
  height: number;
  md5: string;
  name: string;
  nsfw: number;
  path: string;
  size: number;
  thumbnail: string;
  tn_height: number;
  tn_width: number;
  type: number;
  width: number;
  duration: string;
  duration_secs: number;
}

export enum FileTypeEnum {
  WEBM = 6,
  MP4 = 10,
}

export interface ITop {
  board: string;
  info: string;
  name: string;
}

export interface IBoardRoot {
  boards: IBoard[];
  global_boards: number;
  global_posts: string;
  global_speed: string;
  is_index: number;
  tags: ITag;
  type: number;
}
export interface IBoard {
  bump_limit: number;
  category: string;
  default_name: string;
  enable_names: number;
  enable_sage: number;
  id: string;
  info: string;
  last_num: number;
  name: string;
  speed: number;
  threads: number;
  unique_posters: number;
}
export interface ITag {
  board: string;
  tag: string;
}
