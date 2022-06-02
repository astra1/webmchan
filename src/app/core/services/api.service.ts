import { IBoard } from "../models/models";
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { IThread, IPost } from "../models/models";
import { environment } from "../../../environments/environment.prod";

@Injectable({
  providedIn: "root",
})
export class ApiService {
  private hostUrl: string;
  private pathUrl: string;

  private get apiUrl() {
    return encodeURI(`https://${this.hostUrl}/${this.pathUrl}`);
  }

  constructor(private http: HttpClient) {
    // this.hostUrl = location.host.startsWith("localhost")
    //   ? "webmchan.vercel.app/"
    //   : location.host;
    this.hostUrl = environment.apiUrl;
    this.pathUrl = "api/";
  }

  getThreads(boardName: string) {
    return this.http.get<IThread[]>(`${this.apiUrl}thread-list/`, {
      params: {
        board_name: boardName,
      },
    });
  }

  getPosts(boardName: string, threadNum: string) {
    return this.http.get<IPost[]>(`${this.apiUrl}post-list`, {
      params: {
        board_name: boardName,
        thread_num: threadNum,
      },
    });
  }

  getBoards() {
    return this.http.get<IBoard[]>(`${this.apiUrl}board-list`);
  }
}
