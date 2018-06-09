import { environment } from './../../environments/environment';
import { ApiService } from './../core/services/Api.service';
import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Observable, timer } from 'rxjs';
import { IThread } from '../core/models/models';
import { flatMap, tap, publish, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-zero',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './zero.component.html',
  styleUrls: ['./zero.component.css']
})
export class ZeroComponent implements OnInit {
  isThreadImgPreviewOpen = false;
  cols = 3;

  threads$: Observable<IThread[]>;

  constructor(private api: ApiService) { }

  ngOnInit() {
    this.threads$ = timer(500, 10000)
      .pipe(
        switchMap(() => this.api.getThreads(0)),
        tap((val) => console.log('threads updated. amount: ' + val && val.length))
      );
  }

  getThreadThumbnail(thread: IThread) {
    const file = thread.files[0];
    return file ? `${environment.dvachApiUrl}${file.thumbnail}` : '';
  }

  getThreadImage(thread: IThread) {
    const file = thread.files[0];

    if (file && file.type === 10 || file.type === 6) {
      return `${environment.dvachApiUrl}${file.thumbnail}`;
    }

    return file ? `${environment.dvachApiUrl}${file.path}` : '';
  }

}
