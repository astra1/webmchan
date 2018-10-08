import { Injectable } from '@angular/core';

import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SidenavStateService {

  private isOpened$ = new BehaviorSubject<boolean>(false);
  isOpened = this.isOpened$.asObservable();

  constructor() { }

  toggle() {
    this.isOpened$.next(!this.isOpened$.value);
  }

  setState(state: boolean) {
    this.isOpened$.next(state);
  }

  getState(): boolean {
    return this.isOpened$.value;
  }
}
