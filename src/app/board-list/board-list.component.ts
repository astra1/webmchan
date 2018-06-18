import { environment } from './../../environments/environment';
import { SidenavStateService } from './../core/services/sidenav-state.service';
import { faBars, faBolt, faBook, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { ApiService } from './../core/services/Api.service';
import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { IBoard } from '../core/models/models';
import { map, filter } from 'rxjs/operators';

@Component({
  selector: 'app-board-list',
  templateUrl: './board-list.component.html',
  styleUrls: ['./board-list.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BoardListComponent implements OnInit {
  ageCheck = environment.production;
  boards: IBoard[] = [];

  // fontAwesome
  faBars = faBars;
  faBolt = faBolt;
  faBook = faBook;
  faEnvelope = faEnvelope;

  constructor(
    private api: ApiService,
    private cd: ChangeDetectorRef,
    private sidenavState: SidenavStateService
  ) { }

  ngOnInit() {
    this.api.getBoards()
      .pipe(
        filter(boards => !!boards),
        map(boards => {
          return this.ageCheck ? boards.filter(b => b.category !== 'Взрослым') : boards;
        })
      )
      .subscribe(val => {
        this.boards = val;
        this.cd.markForCheck();
      });
  }

  toggleSidenav() {
    this.sidenavState.toggle();
  }

  renew() {
    console.log('not renew');
  }

}
