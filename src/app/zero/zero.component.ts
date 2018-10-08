import { SidenavStateService } from './../core/services/sidenav-state.service';
import { environment } from './../../environments/environment';
import { ApiService } from './../core/services/Api.service';
import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Observable, timer } from 'rxjs';
import { IThread } from '../core/models/models';
import { tap, switchMap } from 'rxjs/operators';
import { faBars, faBolt } from '@fortawesome/free-solid-svg-icons';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-zero',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './zero.component.html',
  styleUrls: ['./zero.component.css']
})
export class ZeroComponent implements OnInit {
  isThreadImgPreviewOpen = false;
  cols = 3;

  // fontawesome
  faBars = faBars;
  faBolt = faBolt;

  threads$: Observable<IThread[]>;

  constructor(
    private api: ApiService,
    private route: ActivatedRoute,
    private sidenavService: SidenavStateService
  ) { }

  ngOnInit() {
    this.threads$ = timer(500, 10000)
      .pipe(
        switchMap(() => this.api.getThreads(this.route.snapshot.params['board_id'])),
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

  toggleSidenav() {
    this.sidenavService.toggle();
  }

}
