import { Observable, BehaviorSubject, of } from 'rxjs';
import { LocalStorage } from '@ngx-pwa/local-storage';
import { Injectable } from '@angular/core';
import { filter, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  private readonly lsKey = 'settings';

  private settings$: BehaviorSubject<ISettings> = new BehaviorSubject<ISettings>({
    path: 'videos',
    savePath: '',
    nswf: false
  });

  settings = this.settings$.asObservable();

  constructor(private ls: LocalStorage) { }

  load() {
    console.log('try to load settings');
    this.ls.getItem(this.lsKey)
      .pipe(
        catchError(e => {
          console.log('init ls error', e);
          return of(null);
        }),
        filter(val => !!val)
      )
      .subscribe(val => {
        console.log('settings from ls', val);
        this.settings$.next(val);
      });
  }

  save(settingsData: ISettings) {
    console.log('preparing to save', settingsData);
    this.ls.setItem(this.lsKey, settingsData)
      .subscribe(val => {
        if (val) {
          this.settings$.next(settingsData);
        }
      });
  }

  get(): Observable<ISettings> {
    // console.log('trying to get: ', key, 'value is: ', this.settings$.value[key]);
    // return this.settings$.value[key];
    return this.ls.getItem(this.lsKey) as Observable<ISettings>;
  }

}

export interface ISettings {
  path: string;
  savePath: string;
  nswf: boolean;
}
