import { environment } from './../../environments/environment';
import { ApiService } from './../core/services/Api.service';
import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs';
import { IThread } from '../core/models/models';

@Component({
  selector: 'app-zero',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './zero.component.html',
  styleUrls: ['./zero.component.css']
})
export class ZeroComponent implements OnInit {
  isThreadImgPreviewOpen = false;
  cols = 3;

  threads$: Observable<any>;

  constructor(private api: ApiService) { }

  ngOnInit() {
    this.getThreads();
  }

  getThreads() {
    this.threads$ = this.api.getThreads(0);
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
