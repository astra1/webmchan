import { environment } from './../../../environments/environment';
import { ApiService } from './../../core/services/Api.service';
import { Component, OnInit, ViewChild, ElementRef, OnDestroy, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Subject, Observable, of, timer } from 'rxjs';
import {
  pluck, filter, flatMap, catchError,
  takeUntil,
  switchMap, map
} from 'rxjs/operators';

import { IThread, IPost, IFile } from '../../core/models/models';
import { faPlay, faVideo } from '@fortawesome/free-solid-svg-icons';
import { PlayerService } from '../../core/services/player.service';
import { tap } from 'rxjs/internal/operators/tap';

@Component({
  selector: 'app-thread',
  templateUrl: './thread.component.html',
  styleUrls: ['./thread.component.css'],
})
export class ThreadComponent implements OnInit, OnDestroy {
  thread_num = '';

  // fa Icons
  faPlay = faPlay;
  faVideo = faVideo;
  lastUpdated: Date = null;

  destroy$: Subject<boolean> = new Subject<boolean>();

  posts: IPost[] = null;
  videos: IFile[] = [];

  loading = false;

  constructor(
    private router: ActivatedRoute,
    private api: ApiService,
    private location: Location,
    private ps: PlayerService
  ) { }

  ngOnInit() {
    this.router.queryParams
      .pipe(
        takeUntil(this.destroy$),
        pluck('thread_num'),
        filter(val => !!val),
        flatMap((val: string) => {
          this.loading = true;
          this.thread_num = val;
          return this.api.getPosts(val);
        }),
        catchError(err => of([]))
      )
      .subscribe((posts: IPost[]) => {
        this.updateData(posts);
      });

    // autoupdate
    if (environment.production) {
      timer(10000, 10000).pipe(
        takeUntil(this.destroy$),
        switchMap(() => this.api.getPosts(this.thread_num)),
        map(val => this.updateData(val))
      ).subscribe(() => {
        console.log('auto_update');
      });
    }
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  private updateData(posts: IPost[]) {
    this.lastUpdated = new Date();
    this.posts = posts;

    this.videos = posts.reduce((prev, curr) => {
      return [...prev, ...curr.files];
    }, []).filter((f: IFile) => f.duration_secs);

    this.ps.setPlaysist(this.videos);
    this.loading = false;
  }

  goBack() {
    this.location.back();
  }

  renew() {
  }

  onPlayClick(file: IFile) {
    this.ps.playFile(file);
  }

  onPlayAllClick() {
    this.ps.setPlaysist(this.videos);
    this.ps.playAll();
  }
}
