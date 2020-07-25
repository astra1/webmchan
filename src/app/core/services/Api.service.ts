import { IBoard } from "./../models/models";
import { environment } from "./../../../environments/environment";
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { Observable, from } from "rxjs";
import { map, take, filter, flatMap, toArray, pluck } from "rxjs/operators";
import { IRootObject, IThread, IPost } from "../models/models";

@Injectable({
  providedIn: "root",
})
export class ApiService {
  private url = environment.dvachApiUrl;

  constructor(private http: HttpClient) {}

  getThreads(boardName: string): Observable<IThread[]> {
    // const page = pageNum <= 0 ? 'index' : pageNum;
    boardName = boardName && boardName !== "" ? boardName : "b";

    return this.http
      .get<IRootObject>(`${this.url}${boardName}/catalog.json`)
      .pipe(
        pluck("threads"),
        map((threads: IThread[]) => {
          threads.sort((a, b) => {
            return a.files_count > b.files_count ? -1 : 1;
          });
          return threads;
        })
      );
  }

  getPosts(boardName: string, threadNum: string): Observable<IPost[]> {
    // const url = http(s)://2ch.hk/доска/res/номер_треда.html

    return this.http
      .get<IRootObject>(`${this.url}${boardName}/res/${threadNum}.json`)
      .pipe(
        pluck("threads"),
        take(1),
        flatMap((arr: IThread[]) => from(arr)),
        flatMap((arr) => arr.posts),
        filter((post: IPost) => post.files.length > 0), // todo to toggle state!
        toArray()
      );
  }

  getBoards() {
    return this.http.get<IBoard[]>("api/board-list");
  }
}
