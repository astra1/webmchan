import { ApiService } from './../../core/services/Api.service';
import { Component, OnInit, ViewChild, ElementRef, HostListener } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Subject, Observable, from as fromPromise, of } from 'rxjs';
import { pluck, filter, flatMap, debounceTime, mergeMap, catchError, distinctUntilChanged } from 'rxjs/operators';

import { IThread, IPost, IFile } from '../../core/models/models';
import { faPlay, faVideo } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-thread',
  templateUrl: './thread.component.html',
  styleUrls: ['./thread.component.css']
})
export class ThreadComponent implements OnInit {
  @ViewChild('videoContainer')

  videoRef: ElementRef;
  thread_num = '';

  // fa Icons
  faPlay = faPlay;
  faVideo = faVideo;

  posts: IPost[] = [];

  videos: IFile[] = [];

  showVideo = true;
  currentVideo$: Subject<IFile> = new Subject();
  currentVideo: IFile = null;

  isPlayHover = false;

  @HostListener('window:keydown', ['$event'])
  onKeyDown(event) {
    this.onVideoKeyPress(event);
  }

  constructor(
    private router: ActivatedRoute,
    private api: ApiService,
    private location: Location
  ) { }

  getHtmlVideo() {
    return this.videoRef.nativeElement as HTMLVideoElement;
  }

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

    this.getHtmlVideo().addEventListener('ended', () => {
      this.getNextVideo(this.currentVideo.name);
    });

    this.showVideo = false;

    this.currentVideo$
      .pipe(
        debounceTime(300),
        filter(val => !!val),
        filter(val => {
          return (val.type === 10 || val.type === 6);
        }),
        mergeMap(val =>
          fromPromise(this.onPlayVideo(val)).pipe(
            catchError(err => of(`Error: ${err}`))
          ))
      ).subscribe((val: any) => {
        if (val instanceof Error) {
          this.getNextVideo(this.currentVideo.name);
        }
        console.log(val);
      });
  }

  private updateData(posts: IPost[]) {
    this.posts = posts;

    this.videos = posts.reduce((prev, curr) => {
      return [...prev, ...curr.files];
    }, []).filter(f => f.duration);
  }


  onPlayVideo(file: IFile) {
    this.showVideo = true;
    this.currentVideo = file;

    this.getHtmlVideo().src = 'https://2ch.hk' + file.path;
    this.getHtmlVideo().load();
    this.getHtmlVideo().focus();

    return this.getHtmlVideo().play();
  }

  goBack() {
    this.location.back();

  }

  getNextVideo(name: string) {
    const index = this.videos.findIndex(v => v.name === name);
    console.log('next ind: ', index);
    console.log('videos length: ', this.videos.length);
    if (index === -1 || index === this.videos.length - 1) {
      this.currentVideo$.next(this.videos[0]);
    } else if (index >= 0) {
      console.log('video: ', this.videos[index + 1]);
      this.currentVideo$.next(this.videos[index + 1]);
    }
  }

  getPrevVideo(name: string) {
    const index = this.videos.findIndex(v => v.name === name);
    if (index === 0) {
      this.currentVideo$.next(this.videos[this.videos.length - 1]);
    } else {
      this.currentVideo$.next(this.videos[index - 1]);
    }
  }

  onVideoKeyPress(event: any) {
    if (this.currentVideo) {
      switch (event.key) {
        case ']':
          this.getNextVideo(this.currentVideo.name);
          console.log('hey');
          break;
        case '[':
          this.getPrevVideo(this.currentVideo.name);
          break;
        case 'Escape':
          this.getHtmlVideo().pause();
          this.getHtmlVideo().src = '';
          this.getHtmlVideo().load();
          this.showVideo = false;
          this.currentVideo = null;
          break;
        case 'f':
          this.getHtmlVideo().webkitRequestFullscreen();
          break;
        case 'Alt':
          this.getHtmlVideo().controls = !this.getHtmlVideo().controls;
          console.log(this.getHtmlVideo().controls);
          break;
        default:
          console.log(event.key);
          console.log('huhey');
          break;
      }
    }
  }

  renew() {
    console.log('renew!');
    this.api.getPosts(this.thread_num).subscribe(val => this.updateData(val));
  }

  onVideoClick() {
    const htmlVideo = this.videoRef.nativeElement as HTMLVideoElement;

    if (!htmlVideo.paused) {
      htmlVideo.pause();
    }

  }

  onMousewheel(event: any) {
    // todo change size
  }
}
