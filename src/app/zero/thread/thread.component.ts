import { ApiService } from './../../core/services/Api.service';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Subject, Observable, from as fromPromise, of } from 'rxjs';
import { pluck, filter, flatMap, debounceTime, mergeMap, catchError, distinctUntilChanged } from 'rxjs/operators';

import { IThread, IPost, IFile } from '../../core/models/models';
import { faPlay, faVideo } from '@fortawesome/free-solid-svg-icons';
import { PlayerService } from '../../core/services/player.service';

@Component({
  selector: 'app-thread',
  templateUrl: './thread.component.html',
  styleUrls: ['./thread.component.css']
})
export class ThreadComponent implements OnInit {
  thread_num = '';

  // fa Icons
  faPlay = faPlay;
  faVideo = faVideo;

  posts: IPost[] = [];
  videos: IFile[] = [];

  isPlayHover = false;

  constructor(
    private router: ActivatedRoute,
    private api: ApiService,
    private location: Location,
    private ps: PlayerService
  ) { }

  ngOnInit() {
    this.router.queryParams
      .pipe(
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
