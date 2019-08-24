import { Observable, BehaviorSubject, of } from "rxjs";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root"
})
export class SettingsService {
  private readonly lsKey = "settings";

  private settings$: BehaviorSubject<ISettings> = new BehaviorSubject<ISettings>({ path: "videos", savePath: "", nswf: false }); 
  settings = this.settings$.asObservable();

  constructor() {

  }

  load() {
    this.settings$.next(JSON.parse(localStorage.getItem(this.lsKey)));
  }

  save(settingsData: ISettings) {
    console.log("preparing to save", settingsData);
    localStorage.setItem(this.lsKey, JSON.stringify(settingsData));
    this.settings$.next(settingsData);
  }

  get(): Observable<ISettings> {
    // console.log('trying to get: ', key, 'value is: ', this.settings$.value[key]);
    // return this.settings$.value[key];
    // return of([localStorage.getItem(this.lsKey)], asapScheduler);
    // return this.ls.getItem(this.lsKey) as Observable<ISettings>;
    return of(JSON.parse(localStorage.getItem(this.lsKey)));
  }
}

export interface ISettings {
  path: string;
  savePath: string;
  nswf: boolean;
}
