import { environment } from './../../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, from } from 'rxjs';
import { map, take, tap, concatMap, filter, flatMap, toArray, pluck, concatAll } from 'rxjs/operators';
import { IRootObject, IThread, IPost, IFile } from '../models/models';

@Injectable()
export class ApiService {

    private url = environment.dvachApiUrl;

    constructor(private http: HttpClient) { }

    getThreads(pageNum: number): Observable<IThread[]> {
        // const page = pageNum <= 0 ? 'index' : pageNum;

        return this.http.get<IRootObject>(`${this.url}b/catalog.json`)
            .pipe(
                pluck('threads'),
                map((threads: IThread[]) => {
                    threads.sort((a, b) => {
                        return a.files_count > b.files_count ? -1 : 1;
                    });
                    return threads;
                })
            );
    }

    getPosts(thread_num: string): Observable<IPost[]> {
        // const url = http(s)://2ch.hk/доска/res/номер_треда.html

        return this.http.get<IRootObject>(`${this.url}b/res/${thread_num}.json`)
            .pipe(
                pluck('threads'),
                take(1),
                flatMap((arr: IThread[]) => from(arr)),
                flatMap(arr => arr.posts),
                filter((post: IPost) => post.files.length > 0), // todo to toggle state!
                toArray()
            );
    }

}
