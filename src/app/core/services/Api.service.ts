import { IBoard } from "./../models/models";
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { IThread, IPost } from "../models/models";

@Injectable({
  providedIn: "root",
})
export class ApiService {
  constructor(private http: HttpClient) {}

  getThreads(boardName: string) {
    return this.http.get<IThread[]>("api/thread-list/", {
      params: {
        board_name: boardName,
      },
    });
  }

  getPosts(boardName: string, threadNum: string) {
    return this.http.get<IPost[]>("api/post-list", {
      params: {
        board_name: boardName,
        thread_num: threadNum,
      },
    });
  }

  getBoards() {
    return this.http.get<IBoard[]>("api/board-list");
  }
}
