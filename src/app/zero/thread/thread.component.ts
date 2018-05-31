import { ApiService } from './../../core/services/Api.service';
import { Component, OnInit, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Subject, Observable, from as fromPromise, of, timer } from 'rxjs';
import { pluck, filter, flatMap, debounceTime, mergeMap, catchError, distinctUntilChanged, takeUntil } from 'rxjs/operators';

import { IThread, IPost, IFile } from '../../core/models/models';
import { faPlay, faVideo } from '@fortawesome/free-solid-svg-icons';
import { PlayerService } from '../../core/services/player.service';

@Component({
  selector: 'app-thread',
  templateUrl: './thread.component.html',
  styleUrls: ['./thread.component.css']
})
export class ThreadComponent implements OnInit, OnDestroy {
  thread_num = '';

  // fa Icons
  faPlay = faPlay;
  faVideo = faVideo;

  destroy$: Subject<boolean> = new Subject<boolean>();

  posts: IPost[] = [];
  videos: IFile[] = [];

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
          this.thread_num = val;
          return this.api.getPosts(val);
        })
      )
      .subscribe((posts: IPost[]) => {
        this.updateData(posts);
      });

    // autoupdate
    timer(10000, 10000).pipe(
      takeUntil(this.destroy$)
    ).subscribe(val => {
      if (this.thread_num !== '') {
        console.log('auto_update');
        this.renew();
      }
    });
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  private updateData(posts: IPost[]) {
    this.posts = posts;

    this.videos = posts.reduce((prev, curr) => {
      return [...prev, ...curr.files];
    }, []).filter(f => f.duration);

    this.ps.setPlaysist(this.videos);
  }

  goBack() {
    this.location.back();
  }

  renew() {
    this.api.getPosts(this.thread_num).subscribe(val => this.updateData(val));
  }

  onPlayClick(file: IFile) {
    this.ps.playFile(file);
  }

  onPlayAllClick() {
    this.ps.setPlaysist(this.videos);
    this.ps.playAll();
  }
}
