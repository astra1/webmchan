import { environment } from './../../environments/environment';
import { ApiService } from './../core/services/Api.service';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { IThread } from '../core/models/models';

@Component({
  selector: 'app-zero',
  templateUrl: './zero.component.html',
  styleUrls: ['./zero.component.css']
})
export class ZeroComponent implements OnInit {

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
    let result = '';
    if (thread) {
      const opPost = thread.posts[0];
      if (opPost) {
        const threadLogo = opPost.files[0];
        if (threadLogo) {
          result = `${environment.dvachApiUrl}${threadLogo.thumbnail}`;
        }
      }
    }

    return result;
  }

}
